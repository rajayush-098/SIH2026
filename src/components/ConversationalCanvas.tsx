import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  CheckSquare, 
  Square, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  RefreshCw,
  Info,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ArrowUpRight
} from "lucide-react";
import { ChatMessage, StructuredAIResponse, UserPersona } from "../types";

interface ConversationalCanvasProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (query: string, language: string) => void;
  onSelectActiveStandardCode: (code: string) => void;
  onExportMemoFromResponse: (response: StructuredAIResponse) => void;
  onOpenSourceDocumentDrawer: (response: StructuredAIResponse) => void;
  persona: UserPersona;
}

export const ConversationalCanvas: React.FC<ConversationalCanvasProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onSelectActiveStandardCode,
  onExportMemoFromResponse,
  onOpenSourceDocumentDrawer,
}) => {
  const [inputText, setInputText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isRecording, setIsRecording] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [expandedCitations, setExpandedCitations] = useState<Record<string, boolean>>({});

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

  const toggleCitationAccordion = (msgId: string) => {
    setExpandedCitations((prev) => ({
      ...prev,
      [msgId]: !prev[msgId],
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
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            Mandatory QCO
          </span>
        );
      case "Hallmarking Mandate":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            Hallmarking Mandate (HUID)
          </span>
        );
      case "CRS Scheme":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            CRS Self-Declaration
          </span>
        );
      case "System Introduction":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
            System Introduction
          </span>
        );
      case "Voluntary":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            Voluntary Standard
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
            Portal Clarification
          </span>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden min-h-[640px] max-h-[calc(100vh-130px)]">
      {/* Canvas Stream Header */}
      <div className="bg-[#0B2545] px-5 py-3 flex items-center justify-between border-b border-[#134074] text-white">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-wide text-slate-200">
            Compliance Stream
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-xs text-slate-300 font-normal">
            Database: Gazette & Product Manuals v2.4 (Active)
          </span>
        </div>
      </div>

      {/* Main Messages Stream with Generous Padding */}
      <div className="flex-1 p-5 sm:p-7 overflow-y-auto space-y-6 bg-[#F8FAFC]">
        {messages.map((msg) => {
          if (msg.sender === "user") {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[85%] sm:max-w-[75%] bg-[#0B2545] text-white px-5 py-3.5 rounded-2xl rounded-tr-xs shadow-xs text-xs sm:text-sm font-normal leading-relaxed">
                  <p>{msg.text}</p>
                  <div className="text-[10px] text-slate-300/80 mt-1.5 text-right font-mono">
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
                <div className="max-w-[90%] sm:max-w-[85%] bg-white border border-slate-200 text-slate-800 p-5 rounded-2xl rounded-tl-xs shadow-xs text-xs sm:text-sm leading-relaxed">
                  <p className="whitespace-pre-wrap">{msg.text || msg.rawMarkdown}</p>
                </div>
              </div>
            );
          }

          const isCitationOpen = expandedCitations[msg.id] || false;

          return (
            <div key={msg.id} className="flex justify-start w-full">
              <div className="w-full bg-white border border-slate-200/90 rounded-2xl shadow-xs p-5 sm:p-6 space-y-5 text-slate-900 transition-all">
                
                {/* Header Strip with Standard Code, Status Badge & Quick Actions */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#134074] bg-blue-50/80 px-2.5 py-0.5 rounded-md border border-blue-100">
                        {resp.standardCode}
                      </span>
                      {getStatusBadgeComponent(resp.statusBadge)}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0B2545] leading-snug">
                      {resp.title}
                    </h3>
                  </div>

                  {/* Top Action: Export Official Memo */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onExportMemoFromResponse(resp)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#134074] hover:bg-[#0B2545] text-xs font-semibold text-white transition-colors shadow-xs"
                      title="Export printable compliance memorandum"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Memo</span>
                    </button>
                  </div>
                </div>

                {/* Executive Summary Block */}
                <div className="bg-[#F8FAFC] border-l-3 border-[#134074] p-4 rounded-r-xl text-xs sm:text-sm text-slate-700 leading-relaxed space-y-1">
                  <p className="font-semibold text-[#0B2545] flex items-center gap-1.5 text-xs">
                    <Info className="w-3.5 h-3.5 text-[#134074]" />
                    <span>Regulatory Scope & Applicability</span>
                  </p>
                  <p className="text-slate-700 font-normal leading-relaxed">{resp.executiveSummary}</p>
                </div>

                {/* Clean, Minimalist Fee Breakdown Table */}
                {resp.feeBreakdown && resp.feeBreakdown.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0B2545] flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#134074]" />
                        <span>Official Fee Schedule</span>
                      </span>
                      <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
                        50% MSME Concession
                      </span>
                    </div>

                    <div className="overflow-hidden border border-slate-200 rounded-xl bg-white">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-slate-50/80 text-slate-600 text-[11px] font-semibold border-b border-slate-200">
                            <th className="py-2.5 px-3.5">Fee Component</th>
                            <th className="py-2.5 px-3.5">Standard Rate</th>
                            <th className="py-2.5 px-3.5 text-emerald-800">MSME Rate</th>
                            <th className="py-2.5 px-3.5 text-slate-500">Remarks</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {resp.feeBreakdown.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                              <td className="py-2.5 px-3.5 font-medium text-slate-800">{item.category}</td>
                              <td className="py-2.5 px-3.5 font-mono text-slate-600">{item.standardRate}</td>
                              <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-700">
                                {item.msmeRate}
                              </td>
                              <td className="py-2.5 px-3.5 text-[11px] text-slate-500">{item.remarks}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Step-by-Step Licensing Checklist */}
                {resp.licensingSteps && resp.licensingSteps.length > 0 && (
                  <div className="space-y-2.5 pt-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0B2545] flex items-center gap-1.5">
                      <CheckSquare className="w-3.5 h-3.5 text-[#134074]" />
                      <span>Certification Workflow Checklist</span>
                    </span>

                    <div className="space-y-2">
                      {resp.licensingSteps.map((step) => {
                        const stepKey = `${msg.id}-step-${step.stepNumber}`;
                        const isDone = checkedSteps[stepKey] || false;
                        return (
                          <div
                            key={step.stepNumber}
                            onClick={() => toggleStepCheckbox(stepKey)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                              isDone
                                ? "bg-emerald-50/50 border-emerald-200"
                                : "bg-white border-slate-200/80 hover:border-[#134074]/40"
                            }`}
                          >
                            <div className="flex items-start gap-3">
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
                                  <Square className="w-4 h-4 text-slate-300" />
                                )}
                              </button>

                              <div className="flex-1 space-y-1">
                                <div className="flex flex-wrap items-center justify-between gap-1">
                                  <span className={`text-xs font-bold ${isDone ? "line-through text-slate-400" : "text-[#0B2545]"}`}>
                                    Step {step.stepNumber}: {step.stepTitle}
                                  </span>
                                  <div className="flex items-center gap-2 text-[10px]">
                                    <span className="font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                                      ⏱ {step.timeline}
                                    </span>
                                    <span className="font-mono px-2 py-0.5 rounded bg-blue-50 text-[#134074] font-semibold border border-blue-100">
                                      {step.portal}
                                    </span>
                                  </div>
                                </div>

                                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                  {step.description}
                                </p>

                                {step.mandatoryDocuments && step.mandatoryDocuments.length > 0 && (
                                  <div className="pt-1 flex flex-wrap items-center gap-1.5">
                                    <span className="text-[10px] text-slate-400 font-semibold">Required:</span>
                                    {step.mandatoryDocuments.map((doc, dIdx) => (
                                      <span
                                        key={dIdx}
                                        className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
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
                  <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-200/80 text-xs space-y-2">
                    <span className="font-bold text-[#0B2545] uppercase tracking-wide text-[11px] block">
                      Mandatory Factory & Lab Testing Specifications
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {resp.technicalRequirements.map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Progressive Disclosure Citation Footer (Clean Accordion + "View Source Document" Drawer trigger) */}
                {resp.sourceCitation && (
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      {/* Left: Expandable Citation Accordion Button */}
                      <button
                        onClick={() => toggleCitationAccordion(msg.id)}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#0B2545] font-medium py-1 px-2 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#134074]" />
                        <span>Source: <span className="font-mono font-semibold text-slate-800">{resp.sourceCitation.documentName}</span></span>
                        {isCitationOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {/* Right: Prominent "View Source Document" button */}
                      <button
                        onClick={() => onOpenSourceDocumentDrawer(resp)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#0B2545] hover:text-white text-xs font-semibold text-[#0B2545] transition-colors border border-slate-200"
                        title="Open complete verified document clause drawer"
                      >
                        <span>📄 View Source Document</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Inline Accordion Details when Expanded */}
                    {isCitationOpen && (
                      <div className="mt-3 p-4 rounded-xl bg-slate-900 text-slate-100 text-xs space-y-2 border border-slate-800 animate-fadeIn">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-amber-300 font-semibold text-xs">
                            § {resp.sourceCitation.clause}
                          </span>
                          <button
                            onClick={() =>
                              handleCopyCitation(
                                `${resp.sourceCitation.documentName} (${resp.sourceCitation.clause})\n"${resp.sourceCitation.snippet}"`,
                                msg.id
                              )
                            }
                            className="text-[10px] text-slate-300 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Excerpt</span>
                              </>
                            )}
                          </button>
                        </div>

                        <p className="italic text-slate-300 leading-relaxed pl-2 border-l-2 border-[#D4AF37]">
                          "{resp.sourceCitation.snippet}"
                        </p>

                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800">
                          <span>Ref: {resp.sourceCitation.gazetteRef || "Statutory BIS Order"}</span>
                          <span>Verified: {resp.sourceCitation.verificationDate}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-start w-full">
            <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 space-y-3 animate-pulse shadow-xs">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-4 h-4 text-[#134074] animate-spin" />
                <span className="text-xs font-semibold text-[#134074]">
                  Consulting verified Product Manuals & Gazette database...
                </span>
              </div>
              <div className="h-4 bg-slate-100 rounded-lg w-3/4"></div>
              <div className="h-4 bg-slate-100 rounded-lg w-1/2"></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="bg-slate-50/90 px-5 py-2.5 border-t border-slate-200/70">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs whitespace-nowrap">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>Suggested:</span>
          </span>
          <button
            onClick={() => handleStarterChipClick("What is the sample size and MSME lab exemption for IS 2347:2023 Pressure Cookers?")}
            className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition-colors shadow-2xs hover:border-[#134074]"
          >
            🍲 IS 2347:2023 Pressure Cooker & MSME Lab Rules
          </button>
          <button
            onClick={() => handleStarterChipClick("What is the mandatory sample size and visor warning for IS 4151:2015 Helmets?")}
            className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition-colors shadow-2xs hover:border-[#134074]"
          >
            🪖 IS 4151:2015 Helmets (8 Units & Visor Tag)
          </button>
          <button
            onClick={() => handleStarterChipClick("What are the revised IS 15820:2024 mandates for AHCs regarding CCTV and ₹40 Lakhs insurance?")}
            className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition-colors shadow-2xs hover:border-[#134074]"
          >
            💎 IS 15820:2024 AHC (30-Day CCTV & ₹40L Policy)
          </button>
          <button
            onClick={() => handleStarterChipClick("What is the fee and process for testing old gold at a BIS recognized AHC?")}
            className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition-colors shadow-2xs hover:border-[#134074]"
          >
            🔍 Consumer Old Gold Testing (₹45 Fee & Cornet Return)
          </button>
          <button
            onClick={() => handleStarterChipClick("How does the 30-day Option-2 simplified procedure work across 754 products?")}
            className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition-colors shadow-2xs hover:border-[#134074]"
          >
            ⚡ Option-2 (30-Day 754 Products List)
          </button>
        </div>
      </div>

      {/* Input Form Bar */}
      <form onSubmit={handleSend} className="p-3.5 bg-white border-t border-slate-200 flex items-center gap-2">
        {/* Language Selector */}
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#134074] cursor-pointer"
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
            className={`w-full bg-[#F4F6F9] border rounded-xl pl-4 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#134074] focus:border-[#134074] transition-all ${
              isRecording ? "border-red-400 ring-2 ring-red-200" : "border-slate-200"
            }`}
          />

          {/* Voice Input */}
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors ${
              isRecording
                ? "bg-red-600 text-white animate-pulse"
                : "text-slate-400 hover:text-[#134074] hover:bg-slate-200"
            }`}
            title="Voice query"
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="px-4.5 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#134074] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
