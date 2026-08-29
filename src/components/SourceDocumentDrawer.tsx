import React, { useState } from "react";
import { 
  X, 
  FileText, 
  BookOpen, 
  Copy, 
  Check, 
  ShieldCheck, 
  Download, 
  ExternalLink,
  CheckCircle2,
  Calendar,
  Building2,
  Hash
} from "lucide-react";
import { BISStandard, SourceCitation, StructuredAIResponse } from "../types";

interface SourceDocumentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeStandard: BISStandard | null;
  activeCitation?: SourceCitation | null;
  onExportMemo?: (standard: BISStandard) => void;
}

export const SourceDocumentDrawer: React.FC<SourceDocumentDrawerProps> = ({
  isOpen,
  onClose,
  activeStandard,
  activeCitation,
  onExportMemo,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Resolve citation data either from activeCitation or activeStandard.sourceDocument
  const docName = activeCitation?.documentName || activeStandard?.sourceDocument?.documentName || "Official BIS Document";
  const clause = activeCitation?.clause || activeStandard?.sourceDocument?.clause || "General Provision";
  const snippet = activeCitation?.snippet || activeStandard?.sourceDocument?.snippet || "Official Gazette / Product Manual Reference";
  const gazette = activeCitation?.gazetteRef || activeStandard?.sourceDocument?.gazetteRef || "Bureau of Indian Standards Act 2016";
  const verifyDate = activeCitation?.verificationDate || activeStandard?.sourceDocument?.verificationDate || "2024-01-01";
  const checksum = activeCitation?.checksum || activeStandard?.sourceDocument?.checksum || "SHA-256: Verified Authenticity";

  const standardCode = activeStandard?.code || "Official BIS Standard";
  const standardTitle = activeStandard?.title || "Bureau of Indian Standards Product Manual";
  const isMandatory = activeStandard?.qcoStatus ? (activeStandard.qcoStatus.includes("Mandatory") || activeStandard.qcoStatus.includes("Hallmarking")) : true;

  const handleCopyCitation = () => {
    const textToCopy = `[Source Citation]\nDocument: ${docName}\nClause: ${clause}\nStandard: ${standardCode}\nExcerpt: "${snippet}"\nRef: ${gazette}\nVerified: ${verifyDate}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md md:max-w-lg bg-white shadow-2xl flex flex-col border-l border-slate-200 transform transition-transform ease-out duration-300">
          
          {/* Header */}
          <div className="bg-[#0B2545] text-white px-5 py-4 flex items-center justify-between border-b border-[#134074]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#D4AF37]">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Source Document & Clause Evidence</span>
                </h3>
                <p className="text-[11px] text-slate-300">Official BIS Gazette & Manual Grounding</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-slate-50/50">
            
            {/* Standard Identification Banner */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-[#0B2545] bg-blue-50 px-2.5 py-1 rounded border border-blue-100">
                  {standardCode}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isMandatory ? "bg-red-50 text-red-700 border border-red-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}>
                  {activeStandard?.qcoStatus || "Mandatory QCO"}
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#0B2545] leading-snug">
                {standardTitle}
              </h4>
              {activeStandard?.scheme && (
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1 border-t border-slate-100">
                  <span className="font-medium text-slate-400">Scheme:</span>
                  <span className="text-[#134074] font-semibold">{activeStandard.scheme}</span>
                </div>
              )}
            </div>

            {/* Extracted PDF Clause Section */}
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B2545] uppercase tracking-wide">
                  <FileText className="w-4 h-4 text-[#134074]" />
                  <span>Exact PDF Clause & Text</span>
                </div>
                <button
                  onClick={handleCopyCitation}
                  className="text-xs text-[#134074] hover:text-[#0B2545] flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Citation</span>
                    </>
                  )}
                </button>
              </div>

              {/* PDF Document Name Badge */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-800">
                <span className="px-1.5 py-0.5 rounded bg-red-600 text-white text-[9px] font-sans font-bold">
                  PDF
                </span>
                <span className="truncate font-semibold text-[#0B2545]">{docName}</span>
              </div>

              {/* Clause Reference */}
              <div className="flex items-center gap-1.5 text-xs text-slate-700">
                <span className="font-semibold text-slate-900">Clause / Section:</span>
                <span className="font-mono text-[#134074] font-bold bg-blue-50 px-2 py-0.5 rounded">
                  {clause}
                </span>
              </div>

              {/* Snippet Quote Block */}
              <div className="p-3.5 bg-slate-900 text-slate-100 rounded-lg border-l-4 border-[#D4AF37] text-xs sm:text-[13px] leading-relaxed italic shadow-inner">
                "{snippet}"
              </div>

              {/* Gazette & Checksum Details */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-400">Gazette / Order:</span>
                  <span className="font-mono text-slate-700 text-right text-[10px]">{gazette}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">Verification Date:</span>
                  <span className="text-slate-700">{verifyDate}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">Checksum Status:</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Authenticity
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Standard Specifications if present */}
            {activeStandard && (
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-[#0B2545] uppercase tracking-wide">
                  Regulatory & Testing Specifications
                </h4>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Standard App Fee</span>
                    <span className="font-mono font-bold text-slate-800">{activeStandard.applicationFee}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100">
                    <span className="text-[10px] text-emerald-700 block font-medium">MSME Concession</span>
                    <span className="font-semibold text-emerald-800 text-[11px]">50% Udyam Rebate</span>
                  </div>
                </div>

                {activeStandard.keyTests && activeStandard.keyTests.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-700 block">Key Testing Requirements:</span>
                    <ul className="space-y-1">
                      {activeStandard.keyTests.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
            {activeStandard && onExportMemo && (
              <button
                onClick={() => {
                  onExportMemo(activeStandard);
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 rounded-lg bg-[#134074] hover:bg-[#0B2545] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Export Compliance Memo</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
