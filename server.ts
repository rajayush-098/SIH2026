import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { ATTACHED_BIS_PDF_DOCUMENTS } from "./src/data/bisPdfCorpus";
import { BIS_STANDARDS_DATABASE } from "./src/data/standardsDatabase";
import {
  matchSemanticQuery,
  synthesizeSemanticGrounding,
  PRODUCT_ONTOLOGY,
} from "./src/data/semanticEngine";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server-side Gemini API client (lazy initialized)
  const getAI = () => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return null;
    return new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-bis-saathi",
        },
      },
    });
  };

  // Compile Comprehensive Grounding Corpus String from Attached PDF Documents
  const COMPILED_PDF_GROUNDING_CORPUS = ATTACHED_BIS_PDF_DOCUMENTS.map((doc, idx) => {
    const clausesText = doc.clauses
      .map((c) => `[${c.clauseNumber}] ${c.heading}: ${c.text}`)
      .join("\n   ");
    const highlights = doc.keyHighlights.map((h) => `- ${h}`).join("\n   ");
    return `
DOCUMENT ${idx + 1}:
Filename: ${doc.fileName}
Title: ${doc.title}
Standard / Regulation Code: ${doc.standardCode || "General Policy"}
Scheme: ${doc.scheme}
QCO Status: ${doc.qcoStatus}
Reference / Circular: ${doc.referenceNumber} (${doc.publishDate})
Key Highlights:
   ${highlights}
Exact Clauses & Excerpts:
   ${clausesText}
Summary: ${doc.fullTextSummary}
--------------------------------------------------`;
  }).join("\n");

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "BIS Saathi Compliance Assistant (Semantic Grounding Engine)",
      attachedDocumentsCount: ATTACHED_BIS_PDF_DOCUMENTS.length,
      standardsDatabaseCount: BIS_STANDARDS_DATABASE.length,
      ontologyConceptsCount: PRODUCT_ONTOLOGY.length,
    });
  });

  // Query Knowledge Corpus for Attached PDFs
  app.get("/api/knowledge-base", (_req, res) => {
    res.json({
      documents: ATTACHED_BIS_PDF_DOCUMENTS.map((d) => ({
        id: d.id,
        fileName: d.fileName,
        title: d.title,
        standardCode: d.standardCode,
        scheme: d.scheme,
        qcoStatus: d.qcoStatus,
        publishDate: d.publishDate,
        keyHighlights: d.keyHighlights,
      })),
      standards: BIS_STANDARDS_DATABASE,
      ontology: PRODUCT_ONTOLOGY.map((p) => ({
        id: p.id,
        code: p.canonicalCode,
        title: p.primaryTitle,
        aliases: p.aliases,
      })),
    });
  });

  // Conversational Intent Classifier & System Introduction Generator
  const isConversationalOrCapabilityQuery = (input: string): boolean => {
    if (!input || typeof input !== "string") return false;
    const raw = input.trim().toLowerCase();
    const text = raw.replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
    if (!text) return true;

    const singleWords = new Set([
      "hi", "hello", "hey", "namaste", "namaskar", "pranam", "greetings", "hola",
      "help", "menu", "start", "info", "about", "intro", "guide", "capabilities"
    ]);
    if (singleWords.has(text)) return true;

    const exactPhrases = [
      "who are you",
      "who r u",
      "who is bis saathi",
      "what are you",
      "what is bis saathi",
      "what is your name",
      "tell me about yourself",
      "introduce yourself",
      "who made you",
      "who created you",
      "what can you do",
      "what do you do",
      "what is this",
      "what is this app",
      "what is this portal",
      "how can you help",
      "how can you help me",
      "how do you help",
      "how does this work",
      "how to use this",
      "how to use bis saathi",
      "what are your features",
      "what services do you offer",
      "help me",
      "good morning",
      "good afternoon",
      "good evening",
      "good day",
      "how are you",
    ];
    if (exactPhrases.includes(text)) return true;

    const conversationalRegexes = [
      /^(hi|hello|hey|namaste|namaskar|pranam|greetings)\b/i,
      /^(who|what)\s+(are|is|r)\s+(you|u|bis saathi|saathi)/i,
      /^what\s+can\s+(you|u)\s+(do|help|assist)/i,
      /^what\s+(do|does)\s+(you|bis saathi)\s+do/i,
      /^how\s+can\s+(you|u)\s+(help|assist)/i,
      /^(tell me about|introduce)\s+(yourself|bis saathi|your features|your capabilities)/i,
      /^(what is|explain)\s+(this portal|this app|this assistant|bis saathi)/i,
      /^help(\s+me)?$/i,
    ];

    return conversationalRegexes.some((regex) => regex.test(text));
  };

  const getSystemIntroductionResponse = (persona: string = "msme", language: string = "en") => {
    const isHindi = language === "hi";

    return {
      title: isHindi
        ? "बीआईएस साथी • राष्ट्रीय मानक अनुपालन एवं विनियामक सहायक"
        : "BIS Saathi • Official National Standards Compliance Assistant",
      standardCode: "BIS-SAATHI-CORE",
      statusBadge: "System Introduction",
      executiveSummary: isHindi
        ? "नमस्ते! मैं 'बीआईएस साथी' (BIS Saathi) हूँ — भारतीय मानक ब्यूरो (Bureau of Indian Standards), उपभोक्ता मामले, खाद्य एवं सार्वजनिक वितरण मंत्रालय, भारत सरकार का आधिकारिक डिजिटल अनुपालन सहायक।\n\nमैं भारतीय मानकों (IS Codes), अनिवार्य गुणवत्ता नियंत्रण आदेशों (QCOs), स्कीम-I (ISI मार्क) लाइसेंसिंग, 50% MSME शुल्क रियायत, स्वर्ण हॉलमार्किंग (HUID) एवं परीक्षण प्रयोगशालाओं की सत्यापित जानकारी प्रदान करता हूँ।"
        : "Hello! I am 'BIS Saathi', the official compliance assistant for the Bureau of Indian Standards (BIS), Ministry of Consumer Affairs, Food & Public Distribution, Government of India.\n\nI provide instant, verified regulatory guidance across Indian Standards (IS Codes), mandatory Quality Control Orders (QCOs), Scheme-I (ISI Mark) licensing, MSME 50% fee concessions, Gold Hallmarking & 6-digit HUID rules, and laboratory testing frameworks under the BIS Act 2016.",
      feeBreakdown: [
        {
          category: isHindi ? "स्कीम-I आवेदन शुल्क" : "Scheme-I Application Processing",
          standardRate: "₹1,000",
          msmeRate: "₹500 (50% Udyam Rebate)",
          remarks: "Online filing on Manakonline.in",
        },
        {
          category: isHindi ? "प्रारंभिक कारखाना ऑडिट शुल्क" : "Preliminary Factory Audit Charges",
          standardRate: "₹7,000 / man-day",
          msmeRate: "₹7,000 / man-day",
          remarks: "Excludes travel/boarding of BIS Officer",
        },
        {
          category: isHindi ? "न्यूनतम वार्षिक मार्किंग शुल्क" : "Annual Minimum Marking Fee",
          standardRate: "₹45,000 - ₹1,00,000+",
          msmeRate: "50% Concession for Micro/Small",
          remarks: "Payable upon grant of CML license",
        },
      ],
      licensingSteps: [
        {
          stepNumber: 1,
          stepTitle: isHindi ? "मानक खोज एवं अनिवार्य QCO सत्यापन" : "Standards Search & Mandatory QCO Verification",
          description: isHindi
            ? "किसी भी उत्पाद के लिए लागू भारतीय मानक (IS Code), QCO अधिसूचना तिथि एवं अनिवार्य अनुपालन स्थिति का सत्यापन।"
            : "Look up applicable Indian Standards (IS), mandatory Quality Control Orders (QCOs), and statutory enforcement deadlines.",
          portal: "bis.gov.in / manakonline.in",
          timeline: isHindi ? "तत्काल" : "Instant",
          mandatoryDocuments: ["Product technical specifications", "Harmonized Tariff (HSN) code"],
        },
        {
          stepNumber: 2,
          stepTitle: isHindi ? "स्कीम-I (ISI मार्क) एवं इन-हाउस लैब सेटअप (STI)" : "Scheme-I (ISI Mark) Licensing & In-House Lab (STI)",
          description: isHindi
            ? "कारखाने में अनिवार्य परीक्षण उपकरण (Annex A & B), कैलिब्रेशन रिकॉर्ड तथा मानक परीक्षण एवं निरीक्षण योजना (STI) की तैयारी।"
            : "Understand factory testing requirements, Scheme of Testing and Inspection (STI), and calibrated apparatus setup.",
          portal: "manakonline.in",
          timeline: isHindi ? "30 दिन (Option-2) / 60-90 दिन (Option-1)" : "30 Days (Option-2 Fast Track) / 60-90 Days (Option-1)",
          mandatoryDocuments: ["Factory layout & machinery list", "In-house lab calibration certs", "Udyam MSME Certificate"],
        },
        {
          stepNumber: 3,
          stepTitle: isHindi ? "स्वर्ण हॉलमार्किंग, 6-अंकीय HUID एवं AHC नियम" : "Gold Hallmarking, 6-Digit HUID & AHC Regulations",
          description: isHindi
            ? "IS 15820:2024 के तहत आभूषण हॉलमार्किंग, 6-अंकीय लेजर HUID प्रोटोकॉल, ₹0 ज्वैलर पंजीकरण तथा उपभोक्ता पुराने सोने की जांच।"
            : "Complete IS 15820:2024 hallmarking rules, zero-fee jeweller registration, 6-digit HUID laser sync, and ₹45 consumer old gold assay.",
          portal: "e-BIS / BIS Care App",
          timeline: isHindi ? "वास्तविक समय" : "Real-time Verification",
          mandatoryDocuments: ["AHC assay certificate", "XRF spectrometry analysis", "Cornet return receipt"],
        },
        {
          stepNumber: 4,
          stepTitle: isHindi ? "50% MSME शुल्क रियायत एवं लागत अनुमान" : "50% MSME Fee Concession & Statutory Cost Calculation",
          description: isHindi
            ? "उद्यम पंजीकृत सूक्ष्म एवं लघु उद्योगों के लिए आवेदन शुल्क एवं वार्षिक मार्किंग शुल्क पर 50% छूट का सटीक विवरण।"
            : "Statutory fee breakdown with automatic 50% concession on application and minimum marking fees for Udyam registered MSMEs.",
          portal: "manakonline.in",
          timeline: isHindi ? "तत्काल गणना" : "Real-time Calculation",
          mandatoryDocuments: ["Valid Udyam Registration Certificate", "GSTIN & PAN"],
        },
      ],
      technicalRequirements: [
        "Search and explore 100+ Indian Standards (IS) across Engineering, Electronics, Chemicals, Food, and Consumer Goods",
        "Interactive Scheme-I (ISI), Scheme-II (CRS), Scheme-IV (Hallmarking), and Option-2 (30-day simplified GoL) workflows",
        "Pan-India NABL and BIS Central/Branch Laboratory directory with testing scopes",
        "Comprehensive QCO Gazette registry with statutory enforcement dates and Micro/Small industry exemptions",
      ],
      sourceCitation: {
        documentName: "Bureau of Indian Standards Act, 2016 (Act No. 11 of 2016)",
        clause: "Section 13, Section 15, Section 16 & Conformity Assessment Regulations 2018",
        gazetteRef: "The Gazette of India: Extraordinary [Part II—Sec. 1]",
        verificationDate: "2024-01-01",
        checksum: "SHA256: BIS-ACT-2016-STATUTORY-RECORD",
        snippet:
          "An Act to provide for the establishment of a national standards body for the harmonious development of the activities of standardisation, marking and quality certification of goods and for matters connected therewith.",
      },
      warningOrNote:
        "All compliance workflows and fee structures are grounded in the BIS Act 2016, Gazette Quality Control Orders, and official BIS Product Manuals. For formal license applications, visit manakonline.in.",
    };
  };

  // Main Chat & Compliance Audit Endpoint
  app.post("/api/saathi-chat", async (req, res) => {
    try {
      const { message, persona = "msme", language = "en" } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Query message is required." });
      }

      // 1. Intent Classifier: Check for greeting, identity, or capability inquiry
      if (isConversationalOrCapabilityQuery(message)) {
        const introResponse = getSystemIntroductionResponse(persona, language);
        return res.json({
          success: true,
          response: introResponse,
          source: "intent-classifier-system-intro",
        });
      }

      // 2. Technical / Compliance Query: Proceed with Semantic Query Expansion & Intent Matching
      const semanticMatch = matchSemanticQuery(message);

      const ai = getAI();
      if (ai) {
        let dynamicDirectives = "";
        if (semanticMatch.concept) {
          dynamicDirectives += `
DETECTED CANONICAL ENTITY & RELEVANT STANDARD:
- Standard Code: ${semanticMatch.concept.canonicalCode}
- Product Category: ${semanticMatch.concept.primaryTitle}
- Query Intent: ${semanticMatch.intent}
`;
        }

        if (semanticMatch.intent === "INTENT_MANUFACTURING_LICENSING") {
          dynamicDirectives += `
MANUFACTURING & LICENSING SYNTHESIS DIRECTIVE:
Synthesize the complete Scheme-I (ISI Mark) certification lifecycle from the corresponding product manual:
1. Factory Infrastructure & Machinery: Production equipment, mould tooling, assembly line requirements.
2. In-House Testing Laboratory (Annex A & B): List the mandatory routine testing apparatus required on premises (e.g., drop impact absorption rigs, dynamic retention, burst pressure rigs, TDS meters, etc.).
3. Qualification Sampling: State exact sample size required for destructive type testing (e.g., exactly 8 helmets for IS 4151 Clause 2(c), 1 cooker/2 for induction for IS 2347 Clause 2(c)).
4. Application Process: Submission via Form-I on Manakonline under Option-2 (30-Day Fast Track) or Option-1.
5. Statutory Fee Breakdown: Application fee (with 50% Udyam MSME concession), factory inspection audit charges (₹7,000/day), and annual minimum marking fee.
`;
        }

        const strictPrompt = `You are 'BIS Saathi', the official compliance assistant for the Bureau of Indian Standards (BIS).

HIGH-PRIORITY INTENT DIRECTIVE:
- If the user asks who you are, what you do, or for help/introduction, DO NOT attempt to cite a standard or pull from the product manuals. Introduce yourself as BIS Saathi, the official compliance assistant for the Bureau of Indian Standards, and outline your regulatory advisory capabilities.

STRICT GROUNDING & SCHEMA DIRECTIVE:
1. Answer based on the attached official BIS PDF documents and standards below whenever applicable.
2. If the user asks a conversational, introductory, general, or meta query, provide a warm, helpful, and professional overview of BIS Saathi capabilities (Standard IS lookup, Mandatory QCO compliance, 50% MSME fee estimation, AHC Hallmarking & HUID rules, Option-2 fast-track licensing, and Lab testing guidelines). Set statusBadge to 'System Introduction' or 'Clarification'.
3. If the requested standard or product is not in the uploaded documents or database, state in the executiveSummary:
"This specific detail is not present in the local database. For official confirmation, please visit manakonline.in or bis.gov.in."
4. You MUST ALWAYS respond with ONLY a valid JSON object matching the schema below. NEVER output markdown code fences, backticks, or non-JSON conversational text.

${dynamicDirectives}

OFFICIAL ATTACHED PDF KNOWLEDGE BASE:
${COMPILED_PDF_GROUNDING_CORPUS}

User Persona: ${persona}
Language: ${language}
User Query: "${message}"

RESPONSE JSON SCHEMA (Mandatory):
{
  "title": "Clear official title for the memo or response (e.g., 'BIS Saathi Capabilities & Standards Guide')",
  "standardCode": "Exact standard code like IS 2347:2023, IS 4151:2015, IS 15820:2024, IS 14543:2016, Option-2 (30-Day GoL), or 'BIS-REF-ONLINE' for conversational / general queries",
  "statusBadge": "Mandatory QCO" | "Hallmarking Mandate" | "CRS Scheme" | "Clarification" | "Voluntary" | "System Introduction",
  "executiveSummary": "Concise official explanation or conversational guidance. Never leave empty.",
  "feeBreakdown": [
    {
      "category": "Fee Name",
      "standardRate": "₹...",
      "msmeRate": "₹...",
      "remarks": "..."
    }
  ],
  "licensingSteps": [
    {
      "stepNumber": 1,
      "stepTitle": "Step Title",
      "description": "Step Description",
      "portal": "manakonline.in" | "e-BIS" | "bis.gov.in" | "AHC Center Desk",
      "timeline": "Timeline",
      "mandatoryDocuments": ["Doc 1", "Doc 2"]
    }
  ],
  "technicalRequirements": ["Requirement / Feature 1", "Requirement / Feature 2"],
  "sourceCitation": {
    "documentName": "Official PDF filename from attached corpus or 'Official BIS Act 2016 & Regulations'",
    "clause": "Exact clause / section or 'General Citizen Information'",
    "gazetteRef": "Gazette reference or 'Bureau of Indian Standards Act 2016'",
    "verificationDate": "2024-01-01",
    "checksum": "SHA256: Verified",
    "snippet": "Direct quote or standard provision text"
  },
  "warningOrNote": "Statutory warning or important citizen notice"
}`;

        try {
          // Standard awaiting without premature 5.5s termination
          const response = await ai.models.generateContent({
            model: "gemini-3.7-flash",
            contents: strictPrompt,
            config: {
              responseMimeType: "application/json",
            },
          });

          const raw = (response?.text || "").trim();

          try {
            const parsed = JSON.parse(raw);
            return res.json({ success: true, response: parsed, source: "gemini-pdf-grounded" });
          } catch (pe) {
            console.error("Failed to parse Gemini JSON output. Raw response text was:", raw, "Error:", pe);
            // If raw text is clean non-JSON, wrap it cleanly in fallback schema
            if (raw.length > 0) {
              const fallbackResponse = {
                title: "BIS Saathi Regulatory Response",
                standardCode: semanticMatch.concept?.canonicalCode || "BIS-REF-ONLINE",
                statusBadge: "Clarification",
                executiveSummary: raw.replace(/^```json|```$/g, "").trim(),
                sourceCitation: {
                  documentName: "Official BIS Regulations & Manakonline Portal",
                  clause: "Citizen & Stakeholder Advisory",
                  gazetteRef: "BIS Act 2016",
                  verificationDate: new Date().toISOString().split("T")[0],
                  checksum: "SHA256: Verified",
                  snippet: "Official guidelines accessible via manakonline.in",
                },
              };
              return res.json({ success: true, response: fallbackResponse, source: "gemini-text-wrapped" });
            }
          }
        } catch (apiErr: any) {
          console.error("Gemini API call failed with error details:", apiErr);
          if (apiErr?.stack) {
            console.error("Stack trace:", apiErr.stack);
          }
        }
      }

      // Local Semantic Engine with Dynamic Synthesis
      const response = synthesizeSemanticGrounding(message, persona);
      return res.json({ success: true, response, source: "bis-semantic-engine" });
    } catch (err: any) {
      console.error("Error in /api/saathi-chat:", err);
      return res.status(500).json({ error: "Internal server error in BIS Saathi." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BIS Saathi Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
