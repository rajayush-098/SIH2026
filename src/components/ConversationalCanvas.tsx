import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  CheckSquare, 
  Square, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  RefreshCw,
  Eye,
  Info
} from "lucide-react";
import { ChatMessage, StructuredAIResponse, UserPersona } from "../types";

interface ConversationalCanvasProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (query: string, language: string) => void;
  onSelectActiveStandardCode: (code: string) => void;
  onExportMemoFromResponse: (response: StructuredAIResponse) => void;
  persona: UserPersona;
}

export const ConversationalCanvas: React.FC<ConversationalCanvasProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onSelectActiveStandardCode,
  onExportMemoFromResponse,
  persona
}) => {
  const [inputText, setInputText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isRecording, setIsRecording] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim(), selectedLanguage);
    setInputText("");
  };

  const handleStarterChipClick = (query: string) => {
    onSendMessage(query, selectedLanguage);
  };

  const toggleStepCheckbox = (stepKey: string) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [stepKey]: !prev[stepKey],
    }));
  };

  const handleCopyCitation = (citationText: string, id: string) => {
    navigator.clipboard.writeText(citationText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleVoice = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      // Simulate speech-to-text recognition or prompt
      setTimeout(() => {
        if (!inputText) {
          setInputText("What are the mandatory tests and fees for IS 4151 motorcycle helmets?");
        }
        setIsRecording(false);
      }, 2500);
    }
  };

  const getStatusBadgeComponent = (badge: string) => {
    switch (badge) {
      case "Mandatory QCO":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
            MANDATORY QCO
          </span>
        );
      case "Hallmarking Mandate":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#D4AF37]/15 text-[#85680d] border border-[#D4AF37]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            HALLMARKING MANDATE (HUID)
          </span>
        );
      case "CRS Scheme":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            SCHEME-II (CRS SELF-DECLARATION)
          </span>
        );
      case "Voluntary":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            VOLUNTARY STANDARD
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
            PORTAL CLARIFICATION
          </span>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white border border-slate-200/80 rounded-xl shadow-sm overflow-hidden min-h-[640px] max-h-[calc(100vh-140px)]">
      {/* Canvas Top Bar */}
      <div className="bg-[#0B2545] px-4 py-2.5 flex items-center justify-between border-b border-[#134074] text-white">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-sans">
            Compliance Stream
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-xs text-slate-300 font-medium">
            Database: Gazette & Product Manuals v2.4 (Active)
          </span>
        </div>
      </div>

      {/* Main Messages Stream */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-5 bg-[#F8FAFC]">
        {messages.map((msg) => {
          if (msg.sender === "user") {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[80%] bg-[#0B2545] text-white px-4 py-3 rounded-2xl rounded-tr-xs shadow-sm text-xs sm:text-sm font-medium leading-relaxed">
                  <p>{msg.text}</p>
                  <div className="text-[10px] text-slate-300/80 mt-1 text-right font-mono">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          }

          const resp = msg.structuredResponse;
          if (!resp) {
            return (
              <div key={msg.id} className="flex justify-start">
                <div className="max-w-[85%] bg-white border border-slate-200 text-slate-800 px-4 py-3 rounded-2xl rounded-tl-xs shadow-sm text-xs sm:text-sm">
                  <p className="whitespace-pre-wrap">{msg.text || msg.rawMarkdown}</p>
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className="flex justify-start w-full">
              <div className="w-full max-w-full bg-white border border-slate-200/90 rounded-xl shadow-sm p-4 sm:p-5 space-y-4 text-slate-900 animate-fadeIn">
                
                {/* Header Strip with Title & Badge */}
                <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#134074] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {resp.standardCode}
                      </span>
                      {getStatusBadgeComponent(resp.statusBadge)}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0B2545] leading-snug">
                      {resp.title}
                    </h3>
                  </div>

                  {/* Actions: Pin to Inspector & Export Memo */}
                  <div className="flex items-center gap-1.5">
                    {resp.standardCode !== "BIS-REF-ONLINE" && (
                      <button
                        onClick={() => onSelectActiveStandardCode(resp.standardCode)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F4F6F9] hover:bg-slate-200 text-[11px] font-semibold text-[#134074] border border-slate-300 transition-colors"
                        title="View detailed clause citations in right inspector"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Inspect Standard</span>
                      </button>
                    )}
                    <button
                      onClick={() => onExportMemoFromResponse(resp)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#134074] hover:bg-[#0B2545] text-[11px] font-semibold text-white transition-colors shadow-xs"
                      title="Export official printable compliance memorandum"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Memo</span>
                    </button>
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="bg-[#F8FAFC] border-l-4 border-[#134074] p-3 rounded-r-lg text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                  <p className="font-medium text-[#0B2545] mb-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#134074]" />
                    <span>Regulatory Scope & Applicability:</span>
                  </p>
                  <p>{resp.executiveSummary}</p>
                </div>

                {/* Markdown Table for Fee Breakdown */}
                {resp.feeBreakdown && resp.feeBreakdown.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0B2545] flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#134074]" />
                        <span>Official Fee Schedule & MSME Concessions</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                        Udyam 50% Concession Verified
                      </span>
                    </div>

                    <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-xs">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#0B2545] text-white text-[11px] uppercase">
                          <tr>
                            <th className="py-2 px-3 font-semibold">Fee Component</th>
                            <th className="py-2 px-3 font-semibold">Standard Rate</th>
                            <th className="py-2 px-3 font-semibold text-[#D4AF37]">MSME / Micro Rate</th>
                            <th className="py-2 px-3 font-semibold">Regulatory Remarks</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                          {resp.feeBreakdown.map((item, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                              <td className="py-2 px-3 font-semibold text-slate-800">{item.category}</td>
                              <td className="py-2 px-3 font-mono text-slate-700">{item.standardRate}</td>
                              <td className="py-2 px-3 font-mono font-bold text-emerald-700 bg-emerald-50/40">
                                {item.msmeRate}
                              </td>
                              <td className="py-2 px-3 text-[11px] text-slate-600">{item.remarks}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Step-by-Step Licensing Checklist with Interactive Checkboxes */}
                {resp.licensingSteps && resp.licensingSteps.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0B2545] flex items-center gap-1.5">
                      <CheckSquare className="w-3.5 h-3.5 text-[#134074]" />
                      <span>Step-by-Step Certification Workflow</span>
                    </span>

                    <div className="space-y-2">
                      {resp.licensingSteps.map((step) => {
                        const stepKey = `${msg.id}-step-${step.stepNumber}`;
                        const isDone = checkedSteps[stepKey] || false;
                        return (
                          <div
                            key={step.stepNumber}
                            onClick={() => toggleStepCheckbox(stepKey)}
                            className={`p-3 rounded-lg border transition-all cursor-pointer select-none ${
                              isDone
                                ? "bg-emerald-50/60 border-emerald-300"
                                : "bg-white border-slate-200 hover:border-[#134074]/50"
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <button
                                type="button"
                                className="mt-0.5 text-[#134074] focus:outline-none"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleStepCheckbox(stepKey);
                                }}
                              >
                                {isDone ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-400" />
                                )}
                              </button>

                              <div className="flex-1 space-y-1">
                                <div className="flex flex-wrap items-center justify-between gap-1">
                                  <span className={`text-xs font-bold ${isDone ? "line-through text-slate-500" : "text-[#0B2545]"}`}>
                                    Step {step.stepNumber}: {step.stepTitle}
                                  </span>
                                  <div className="flex items-center gap-2 text-[10px]">
                                    <span className="font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                      ⏱ {step.timeline}
                                    </span>
                                    <span className="font-mono px-1.5 py-0.5 rounded bg-blue-50 text-[#134074] font-semibold border border-blue-200">
                                      {step.portal}
                                    </span>
                                  </div>
                                </div>

                                <p className="text-[11px] text-slate-600 leading-relaxed">
                                  {step.description}
                                </p>

                                {step.mandatoryDocuments && step.mandatoryDocuments.length > 0 && (
                                  <div className="pt-1 flex flex-wrap items-center gap-1.5">
                                    <span className="text-[10px] text-slate-400 font-semibold">Docs:</span>
                                    {step.mandatoryDocuments.map((doc, dIdx) => (
                                      <span
                                        key={dIdx}
                                        className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                                      >
                                        {doc}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Technical Testing Requirements */}
                {resp.technicalRequirements && resp.technicalRequirements.length > 0 && (
                  <div className="space-y-1.5 bg-[#F4F6F9] p-3 rounded-lg border border-slate-200 text-xs">
                    <span className="font-bold text-[#0B2545] uppercase tracking-wide text-[11px] block">
                      Mandatory Factory & Lab Testing Specifications:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-700">
                      {resp.technicalRequirements.map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Source Citation Card */}
                {resp.sourceCitation && (
                  <div className="bg-slate-900 text-white p-3 rounded-lg text-xs space-y-1.5 shadow-sm border border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[#D4AF37] font-bold text-[11px] uppercase tracking-wider">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Official Document Source Citation</span>
                      </div>
                      <button
                        onClick={() =>
                          handleCopyCitation(
                            `${resp.sourceCitation.documentName} - ${resp.sourceCitation.clause}\n${resp.sourceCitation.snippet}`,
                            msg.id
                          )
                        }
                        className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Citation</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="font-mono text-[11px] text-amber-200 flex flex-wrap items-center gap-2">
                      <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        📄 {resp.sourceCitation.documentName}
                      </span>
                      <span className="text-slate-300">§ {resp.sourceCitation.clause}</span>
                    </div>

                    <p className="text-[11px] text-slate-300 italic border-l-2 border-[#D4AF37] pl-2 py-0.5">
                      "{resp.sourceCitation.snippet}"
                    </p>

                    <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-1">
                      <span>Ref: {resp.sourceCitation.gazetteRef || "Bureau of Indian Standards Act 2016"}</span>
                      <span>{resp.sourceCitation.checksum}</span>
                    </div>
                  </div>
                )}

                {/* Legal Warning or Note */}
                {resp.warningOrNote && (
                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{resp.warningOrNote}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Spinner / Skeleton */}
        {isLoading && (
          <div className="flex justify-start w-full animate-pulse">
            <div className="w-full max-w-full bg-white border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-4 h-4 text-[#134074] animate-spin" />
                <span className="text-xs font-semibold text-[#134074]">
                  Retrieving verified Product Manuals & Gazette references...
                </span>
              </div>
              <div className="h-4 bg-slate-100 rounded w-3/4"></div>
              <div className="h-4 bg-slate-100 rounded w-1/2"></div>
              <div className="h-16 bg-slate-50 rounded border border-slate-100"></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Action Chips Above Input */}
      <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200/80">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs whitespace-nowrap">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>Suggested:</span>
          </span>
          <button
            onClick={() => handleStarterChipClick("What is the sample size and MSME lab exemption for IS 2347:2023 Pressure Cookers?")}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs hover:border-[#134074]"
          >
            🍲 IS 2347:2023 Pressure Cooker & MSME Lab Rules
          </button>
          <button
            onClick={() => handleStarterChipClick("What is the mandatory sample size and visor warning for IS 4151:2015 Helmets?")}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs hover:border-[#134074]"
          >
            🪖 IS 4151:2015 Helmets (8 Units & Visor Tag)
          </button>
          <button
            onClick={() => handleStarterChipClick("What are the revised IS 15820:2024 mandates for AHCs regarding CCTV and ₹40 Lakhs insurance?")}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs hover:border-[#134074]"
          >
            💎 IS 15820:2024 AHC (30-Day CCTV & ₹40L Policy)
          </button>
          <button
            onClick={() => handleStarterChipClick("What is the fee and process for testing old gold at a BIS recognized AHC?")}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs hover:border-[#134074]"
          >
            🔍 Consumer Old Gold Testing (₹45 Fee & Cornet Return)
          </button>
          <button
            onClick={() => handleStarterChipClick("What are the audit timelines and FMCS PBG requirements under Scheme-X GoL?")}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs hover:border-[#134074]"
          >
            📜 Scheme-X GoL (60-Day Licence & $10k PBG)
          </button>
          <button
            onClick={() => handleStarterChipClick("Explain the 9-stage purification and TDS limit under IS 14543 Packaged Water")}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs hover:border-[#134074]"
          >
            💧 IS 14543 Packaged Water (9-Stage & TDS 500 max)
          </button>
          <button
            onClick={() => handleStarterChipClick("How does the 30-day Option-2 simplified procedure work across 754 products?")}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs hover:border-[#134074]"
          >
            ⚡ Option-2 (30-Day 754 Products List)
          </button>
        </div>
      </div>

      {/* Input Form Bar */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        {/* Language Selector Dropdown */}
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#134074] cursor-pointer"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी (Hindi)</option>
          <option value="mr">मराठी (Marathi)</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="te">తెలుగు (Telugu)</option>
        </select>

        {/* Input Text Box */}
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              isRecording
                ? "Listening... Speak your standards query..."
                : "Ask BIS Saathi about IS codes, QCO orders, testing fees, or licensing steps..."
            }
            className={`w-full bg-[#F4F6F9] border rounded-lg pl-3 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#134074] focus:border-[#134074] transition-all ${
              isRecording ? "border-red-400 ring-2 ring-red-200" : "border-slate-300"
            }`}
          />

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors ${
              isRecording
                ? "bg-red-600 text-white animate-pulse"
                : "text-slate-400 hover:text-[#134074] hover:bg-slate-200"
            }`}
            title="Voice input simulation"
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>

        {/* Send Action Button */}
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="px-4 py-2.5 rounded-lg bg-[#0B2545] hover:bg-[#134074] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
