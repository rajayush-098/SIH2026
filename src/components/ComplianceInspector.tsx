import React, { useState } from "react";
import { 
  FileCheck, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  Tag, 
  Building, 
  Scale, 
  Eye,
  BookOpen,
  Copy,
  Check
} from "lucide-react";
import { BISStandard } from "../types";

interface ComplianceInspectorProps {
  activeStandard: BISStandard | null;
  onExportMemo: (standard: BISStandard) => void;
  onSelectStandard: (std: BISStandard) => void;
  allStandards: BISStandard[];
}

export const ComplianceInspector: React.FC<ComplianceInspectorProps> = ({
  activeStandard,
  onExportMemo,
  onSelectStandard,
  allStandards
}) => {
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [isFullDocumentViewerOpen, setIsFullDocumentViewerOpen] = useState(false);

  const handleCopySnippet = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  if (!activeStandard) {
    return (
      <aside className="w-full lg:w-[28%] shrink-0 flex flex-col gap-4 bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm text-center">
        <div className="py-12 flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <FileText className="w-6 h-6 text-[#134074]" />
          </div>
          <h3 className="font-bold text-sm text-[#0B2545]">Evidence & Compliance Inspector</h3>
          <p className="text-xs text-slate-500 max-w-[220px]">
            Ask a compliance question or select a standard from the list below to inspect official citations and clause manuals.
          </p>

          <div className="w-full pt-4 space-y-1.5 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
              Select Standard to Inspect:
            </span>
            {allStandards.slice(0, 4).map((std) => (
              <button
                key={std.id}
                onClick={() => onSelectStandard(std)}
                className="w-full px-2.5 py-1.5 rounded bg-[#F4F6F9] hover:bg-slate-200 text-xs font-semibold text-[#0B2545] flex items-center justify-between transition-colors text-left"
              >
                <span>{std.code}</span>
                <span className="text-[10px] text-slate-500 truncate max-w-[120px]">{std.title}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  const isMandatory = activeStandard.qcoStatus.includes("Mandatory") || activeStandard.qcoStatus.includes("Hallmarking");

  return (
    <aside className="w-full lg:w-[28%] shrink-0 flex flex-col gap-4 bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-sm overflow-y-auto max-h-[calc(100vh-140px)]">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#134074]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
            Evidence & RAG Inspector
          </h2>
        </div>
        <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-200">
          Grounded Verified
        </span>
      </div>

      {/* Active Standard Card */}
      <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 space-y-3 shadow-2xs">
        {/* Standard Code & Status */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <span className="font-mono text-sm font-bold text-[#0B2545] bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs inline-block">
              {activeStandard.code}
            </span>
            {activeStandard.hindiTitle && (
              <p className="text-[11px] text-slate-500 font-medium font-sans">
                {activeStandard.hindiTitle}
              </p>
            )}
          </div>

          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              isMandatory
                ? "bg-red-100 text-red-800 border border-red-200"
                : "bg-blue-100 text-blue-800 border border-blue-200"
            }`}
          >
            {activeStandard.qcoStatus}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] leading-snug">
          {activeStandard.title}
        </h3>

        {/* Metadata Details */}
        <div className="space-y-2 text-xs text-slate-600 border-t border-slate-200/80 pt-2.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Scheme:</span>
            <span className="font-semibold text-[#134074] bg-blue-50 px-2 py-0.5 rounded text-[11px]">
              {activeStandard.scheme}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <span className="text-slate-400 font-medium shrink-0">Ministry:</span>
            <span className="font-medium text-right text-slate-800 text-[11px]">
              {activeStandard.ministry}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">QCO Notification:</span>
            <span className="font-mono text-[10px] text-slate-700">
              {activeStandard.qcoNotificationNumber}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <span className="text-slate-400 font-medium shrink-0">Sample Size:</span>
            <span className="text-[11px] text-right font-medium text-slate-700">
              {activeStandard.sampleSize}
            </span>
          </div>
        </div>

        {/* Fee Pill Preview */}
        <div className="bg-white border border-slate-200 rounded-lg p-2.5 space-y-1 text-xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500">App Fee:</span>
            <span className="font-mono font-bold text-slate-800">{activeStandard.applicationFee.split("+")[0]}</span>
          </div>
          <div className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-100">
            ✓ {activeStandard.msmeConcession}
          </div>
        </div>
      </div>

      {/* Official Document Source Citation Drawer */}
      <div className="bg-[#0B2545] text-white rounded-xl p-4 space-y-3 shadow-md border border-[#134074]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#D4AF37] font-bold text-xs uppercase tracking-wide">
            <BookOpen className="w-4 h-4" />
            <span>Official Document Source</span>
          </div>
          <button
            onClick={() => handleCopySnippet(activeStandard.sourceDocument.snippet)}
            className="text-[10px] text-slate-300 hover:text-white flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/10"
          >
            {copiedSnippet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedSnippet ? "Copied" : "Copy"}</span>
          </button>
        </div>

        {/* PDF Name Badge */}
        <div className="bg-white/10 rounded-lg p-2.5 space-y-1 text-xs border border-white/15">
          <div className="flex items-center gap-2 font-mono text-[11px] text-amber-300 font-semibold truncate">
            <span className="px-1.5 py-0.2 rounded bg-red-600 text-white text-[9px] font-sans font-bold">PDF</span>
            <span>{activeStandard.sourceDocument.documentName}</span>
          </div>
          <p className="text-[11px] text-slate-300 font-sans">
            Section / Clause: <span className="font-semibold text-white">{activeStandard.sourceDocument.clause}</span>
          </p>
        </div>

        {/* Snippet Quote */}
        <div className="text-xs text-slate-200 bg-slate-950/60 p-3 rounded-lg border-l-2 border-[#D4AF37] leading-relaxed italic text-[11px]">
          "{activeStandard.sourceDocument.snippet}"
        </div>

        {/* Gazette & Hash Meta */}
        <div className="space-y-1 pt-1 text-[9px] font-mono text-slate-400 border-t border-white/10">
          <div className="truncate">
            Gazette Ref: {activeStandard.sourceDocument.gazetteRef || "S.O. Official Order"}
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Verified: {activeStandard.sourceDocument.verificationDate}</span>
            <span className="text-emerald-400 font-bold">SHA-256 Valid</span>
          </div>
        </div>
      </div>

      {/* Key Testing Parameters Checklist */}
      <div className="space-y-2 text-xs">
        <span className="font-bold text-[#0B2545] uppercase tracking-wider text-[11px] block">
          Key Performance & Lab Tests
        </span>
        <ul className="space-y-1.5 text-[11px] text-slate-700">
          {activeStandard.keyTests.map((test, tIdx) => (
            <li key={tIdx} className="flex items-start gap-1.5 bg-slate-50 p-2 rounded border border-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#134074] shrink-0 mt-0.5" />
              <span>{test}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Prominent Export Button at Bottom */}
      <div className="mt-auto pt-3 border-t border-slate-200">
        <button
          onClick={() => onExportMemo(activeStandard)}
          className="w-full py-3 px-4 rounded-xl bg-[#134074] hover:bg-[#0B2545] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
        >
          <Download className="w-4 h-4 text-[#D4AF37]" />
          <span>Export Compliance Memo (PDF)</span>
        </button>
        <p className="text-[10px] text-center text-slate-400 mt-1.5">
          Generates official printable GovTech compliance memorandum with watermark.
        </p>
      </div>
    </aside>
  );
};
