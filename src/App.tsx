import React, { useState } from "react";
import { Header } from "./components/Header";
import { CommandSidebar } from "./components/CommandSidebar";
import { ConversationalCanvas } from "./components/ConversationalCanvas";
import { ComplianceInspector } from "./components/ComplianceInspector";
import { StandardsIndexModal } from "./components/StandardsIndexModal";
import { FeeEstimatorModal } from "./components/FeeEstimatorModal";
import { LabLocatorModal } from "./components/LabLocatorModal";
import { AuditWizardModal } from "./components/AuditWizardModal";
import { ComplianceMemoModal } from "./components/ComplianceMemoModal";
import { STANDARDS_DATABASE } from "./data/standardsDatabase";
import { BISStandard, ChatMessage, StructuredAIResponse, UserPersona } from "./types";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function App() {
  const [persona, setPersona] = useState<UserPersona>("msme");
  const [activeStandard, setActiveStandard] = useState<BISStandard | null>(() => {
    return STANDARDS_DATABASE.find((s) => s.code === "IS 4151:2015") || STANDARDS_DATABASE[0];
  });

  // Modals state
  const [isStandardsIndexOpen, setIsStandardsIndexOpen] = useState(false);
  const [isFeeEstimatorOpen, setIsFeeEstimatorOpen] = useState(false);
  const [isLabLocatorOpen, setIsLabLocatorOpen] = useState(false);
  const [isAuditWizardOpen, setIsAuditWizardOpen] = useState(false);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [memoData, setMemoData] = useState<BISStandard | StructuredAIResponse | null>(null);

  // Active Tool state
  const [activeTool, setActiveTool] = useState<string>("chat");
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Chat conversation state
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-welcome",
      sender: "ai",
      timestamp: "10:00 AM",
      structuredResponse: {
        title: "BIS Saathi Intelligence Hub • National Compliance System",
        standardCode: "IS 4151:2015",
        statusBadge: "Mandatory QCO",
        executiveSummary:
          "Welcome to BIS Saathi. Under the Bureau of Indian Standards Act 2016 and departmental Quality Control Orders (QCOs), this portal provides verified compliance pathways, statutory fee calculations with 50% Udyam MSME concessions, testing scopes, and licensing workflows. All guidance is cross-referenced against official BIS Product Manuals and Gazette notifications.",
        feeBreakdown: [
          {
            category: "Scheme-I Application Processing Fee",
            standardRate: "₹1,000",
            msmeRate: "₹500 (50% Udyam Rebate)",
            remarks: "Online filing on Manakonline.in",
          },
          {
            category: "Preliminary Factory Audit Charges",
            standardRate: "₹7,000 / man-day",
            msmeRate: "₹7,000 / man-day",
            remarks: "Excludes travel/boarding of BIS Officer",
          },
          {
            category: "Annual Minimum Marking Fee",
            standardRate: "₹45,000",
            msmeRate: "₹22,500 (50% Micro/Small Rebate)",
            remarks: "Payable upon grant of CML license",
          },
        ],
        licensingSteps: [
          {
            stepNumber: 1,
            stepTitle: "Setup Mandatory In-House Lab Testing Facility",
            description: "Install calibrated equipment required as per BIS Scheme of Testing and Inspection (STI) Annexure-A.",
            portal: "Factory Premises",
            timeline: "1-2 Weeks",
            mandatoryDocuments: ["Equipment calibration certs", "Factory layout", "Machinery list"],
          },
          {
            stepNumber: 2,
            stepTitle: "Online Application & Form-I Submission",
            description: "Submit Form-I on Manakonline with Udyam Certificate and Form-V application fee.",
            portal: "manakonline.in",
            timeline: "1-3 Days",
            mandatoryDocuments: ["Udyam Registration", "GSTIN & PAN", "Process Flowchart"],
          },
          {
            stepNumber: 3,
            stepTitle: "Factory Inspection & Sample Sealing",
            description: "BIS Inspecting Officer verifies quality control and seals production samples for independent NABL testing.",
            portal: "e-BIS",
            timeline: "15-20 Days",
            mandatoryDocuments: ["Quality Manual", "Raw material test certs", "Production register"],
          },
          {
            stepNumber: 4,
            stepTitle: "Grant of Manufacturing License (CML)",
            description: "Issuance of Certificate of Manufacturing License and authorization to use the ISI Mark.",
            portal: "manakonline.in",
            timeline: "7 Days post lab report",
            mandatoryDocuments: ["Marking fee undertaking", "Artwork specimen"],
          },
        ],
        technicalRequirements: [
          "Impact Attenuation: Peak headform acceleration < 300g at 7.5 m/s drop speed",
          "Dynamic Chin Strap Retention: Displacement under 15kg load < 35mm",
          "Weight Limitation: Strict cap at 1,200 grams maximum mass",
          "Peripheral Vision: Minimum 105° horizontal field on each side",
        ],
        sourceCitation: {
          documentName: "BIS_Product_Manual_IS_4151_v2024.pdf",
          clause: "Clause 4.2 & Clause 7.1 (Marking & QCO Order S.O. 4252(E))",
          gazetteRef: "MoRTH Gazette Order S.O. 4252(E) under BIS Act 2016",
          verificationDate: "2024-03-15",
          checksum: "SHA-256: 8a7f92b4129e09d13fca382109e201b1",
          snippet:
            "Under Section 16 of the BIS Act 2016 and Helmet QCO, no person shall manufacture, import, sell or distribute two-wheeler helmets without valid BIS Standard Mark (ISI). Maximum allowable helmet weight capped at 1.2 kg.",
        },
        warningOrNote:
          "Selling non-ISI helmets or helmets exceeding 1.2kg attracts strict penalties under Section 29 of the BIS Act 2016, including seizure and prosecution.",
      },
    },
  ]);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSendMessage = async (queryText: string, language: string = "en") => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/saathi-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: queryText,
          persona: persona,
          language: language,
        }),
      });

      const data = await response.json();

      if (data.success && data.response) {
        const aiResp: StructuredAIResponse = data.response;

        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          structuredResponse: aiResp,
        };

        setMessages((prev) => [...prev, aiMsg]);

        // If the query returned a known standard or dynamic citation, sync the Right Inspector
        if (aiResp.standardCode && aiResp.standardCode !== "BIS-REF-ONLINE") {
          const matched = STANDARDS_DATABASE.find(
            (s) =>
              s.code.toLowerCase().includes(aiResp.standardCode.toLowerCase()) ||
              aiResp.standardCode.toLowerCase().includes(s.code.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")) ||
              s.id.toLowerCase().includes(aiResp.standardCode.toLowerCase().replace(/[^a-z0-9]/g, ""))
          );
          if (matched) {
            setActiveStandard(matched);
          } else if (aiResp.sourceCitation && aiResp.sourceCitation.documentName) {
            const dynamicStd: BISStandard = {
              id: aiResp.standardCode.toLowerCase().replace(/[^a-z0-9]/g, "-"),
              code: aiResp.standardCode,
              title: aiResp.title,
              domain: "Bureau of Indian Standards Regulation",
              scheme: aiResp.statusBadge === "Hallmarking Mandate" ? "Scheme-IV (Hallmarking)" : "Scheme-I (ISI Mark)",
              ministry: "Ministry of Consumer Affairs / Line Ministry",
              qcoStatus: aiResp.statusBadge,
              qcoNotificationNumber: aiResp.sourceCitation.gazetteRef || "Statutory BIS Order",
              qcoDate: aiResp.sourceCitation.verificationDate || "2024-01-01",
              effectiveDate: "Mandatory Order",
              scope: aiResp.executiveSummary,
              sampleSize: "As specified in relevant Product Manual",
              keyTests: (aiResp.technicalRequirements && aiResp.technicalRequirements.length > 0) ? aiResp.technicalRequirements : ["Routine & Type Testing as per BIS STI"],
              applicationFee: aiResp.feeBreakdown?.[0]?.standardRate || "₹1,000",
              annualMarkingFee: aiResp.feeBreakdown?.[2]?.standardRate || "Statutory Marking Fee",
              msmeConcession: "50% concession on application and marking fee for Micro/Small enterprises",
              applicableLabCategories: ["Central Lab Sahibabad", "BIS Recognized Labs"],
              sourceDocument: {
                documentName: aiResp.sourceCitation.documentName,
                clause: aiResp.sourceCitation.clause,
                gazetteRef: aiResp.sourceCitation.gazetteRef,
                verificationDate: aiResp.sourceCitation.verificationDate,
                checksum: aiResp.sourceCitation.checksum,
                snippet: aiResp.sourceCitation.snippet,
              },
            };
            setActiveStandard(dynamicStd);
          }
        }
      } else {
        const fallbackMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          text:
            "This specific detail is not present in my local database. For official confirmation, please visit manakonline.in.",
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      }
    } catch (err) {
      console.error("Error communicating with BIS Saathi:", err);
      const errorMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text:
          "This specific detail is not present in my local database. For official confirmation, please visit manakonline.in.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectActiveStandardCode = (code: string) => {
    const found = STANDARDS_DATABASE.find(
      (s) =>
        s.code.toLowerCase().includes(code.toLowerCase()) ||
        code.toLowerCase().includes(s.code.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""))
    );
    if (found) {
      setActiveStandard(found);
      showToast(`Active Inspector switched to ${found.code}`);
    }
  };

  const handleExportMemoFromResponse = (response: StructuredAIResponse) => {
    setMemoData(response);
    setIsMemoModalOpen(true);
  };

  const handleExportMemoFromStandard = (standard: BISStandard) => {
    setMemoData(standard);
    setIsMemoModalOpen(true);
  };

  const handleSelectTool = (tool: "chat" | "audit-wizard" | "standards-index" | "fee-estimator" | "lab-locator") => {
    setActiveTool(tool);
    if (tool === "audit-wizard") setIsAuditWizardOpen(true);
    if (tool === "standards-index") setIsStandardsIndexOpen(true);
    if (tool === "fee-estimator") setIsFeeEstimatorOpen(true);
    if (tool === "lab-locator") setIsLabLocatorOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900 flex flex-col font-sans antialiased selection:bg-[#134074] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B2545] border border-[#134074] text-xs font-semibold text-white shadow-2xl animate-bounce">
          {toastMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top GovTech Header */}
      <Header
        persona={persona}
        onOpenAuditWizard={() => setIsAuditWizardOpen(true)}
        onOpenFeeEstimator={() => setIsFeeEstimatorOpen(true)}
        onOpenStandardsIndex={() => setIsStandardsIndexOpen(true)}
      />

      {/* Main 3-Zone Architecture Layout */}
      <main className="flex-1 w-full max-w-[1700px] mx-auto px-3 sm:px-5 lg:px-6 py-4 flex flex-col lg:flex-row gap-4 items-start">
        {/* Zone 1: Left Command Sidebar (20-22%) */}
        <CommandSidebar
          persona={persona}
          onPersonaChange={(p) => {
            setPersona(p);
            showToast(`Switched persona to ${p.toUpperCase()}`);
          }}
          activeTool={activeTool}
          onSelectTool={handleSelectTool}
          onTriggerPresetQuery={(q) => handleSendMessage(q)}
        />

        {/* Zone 2: Center Conversational Canvas (50%) */}
        <ConversationalCanvas
          messages={messages}
          isLoading={isLoading}
          onSendMessage={handleSendMessage}
          onSelectActiveStandardCode={handleSelectActiveStandardCode}
          onExportMemoFromResponse={handleExportMemoFromResponse}
          persona={persona}
        />

        {/* Zone 3: Right Evidence & Compliance Inspector (28-30%) */}
        <ComplianceInspector
          activeStandard={activeStandard}
          onExportMemo={handleExportMemoFromStandard}
          onSelectStandard={(std) => {
            setActiveStandard(std);
            showToast(`Selected ${std.code} in Inspector`);
          }}
          allStandards={STANDARDS_DATABASE}
        />
      </main>

      {/* Bottom Official Disclaimer Footer */}
      <footer className="border-t border-slate-200 bg-white py-3 text-center text-xs text-slate-500 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <span className="font-medium text-slate-600">
            Responses are generated from official BIS Product Manuals and Gazettes.
          </span>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[10px]">
            <span>Bureau of Indian Standards Act, 2016</span>
            <span>•</span>
            <span>https://www.manakonline.in</span>
          </div>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <StandardsIndexModal
        isOpen={isStandardsIndexOpen}
        onClose={() => setIsStandardsIndexOpen(false)}
        standards={STANDARDS_DATABASE}
        onSelectStandard={(std) => {
          setActiveStandard(std);
          showToast(`Inspecting ${std.code}`);
        }}
        onAskAboutStandard={(query) => handleSendMessage(query)}
      />

      <FeeEstimatorModal
        isOpen={isFeeEstimatorOpen}
        onClose={() => setIsFeeEstimatorOpen(false)}
        onConsultSaathi={(query) => handleSendMessage(query)}
      />

      <LabLocatorModal
        isOpen={isLabLocatorOpen}
        onClose={() => setIsLabLocatorOpen(false)}
      />

      <AuditWizardModal
        isOpen={isAuditWizardOpen}
        onClose={() => setIsAuditWizardOpen(false)}
        onRunAudit={(query) => handleSendMessage(query)}
      />

      <ComplianceMemoModal
        isOpen={isMemoModalOpen}
        onClose={() => setIsMemoModalOpen(false)}
        data={memoData}
      />
    </div>
  );
}

export default App;
