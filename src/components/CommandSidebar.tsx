import React from "react";
import { 
  UserCheck, 
  FileSearch, 
  Calculator, 
  MapPin, 
  ExternalLink, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle, 
  Building2, 
  Award, 
  Smartphone, 
  Layers,
  HelpCircle
} from "lucide-react";
import { UserPersona } from "../types";

interface CommandSidebarProps {
  persona: UserPersona;
  onPersonaChange: (persona: UserPersona) => void;
  activeTool: string;
  onSelectTool: (tool: "chat" | "audit-wizard" | "standards-index" | "fee-estimator" | "lab-locator") => void;
  onTriggerPresetQuery: (query: string) => void;
}

export const CommandSidebar: React.FC<CommandSidebarProps> = ({
  persona,
  onPersonaChange,
  activeTool,
  onSelectTool,
  onTriggerPresetQuery
}) => {
  return (
    <aside className="w-full lg:w-[22%] shrink-0 flex flex-col gap-4 bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm">
      {/* Persona Switcher Block */}
      <div className="space-y-2 pb-3 border-b border-slate-100">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5 text-[#134074]" />
          <span>Active Stakeholder Persona</span>
        </label>
        
        <div className="relative">
          <select
            value={persona}
            onChange={(e) => onPersonaChange(e.target.value as UserPersona)}
            className="w-full bg-[#F4F6F9] border border-slate-300 rounded-lg px-3 py-2.5 text-xs font-semibold text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#134074] focus:border-[#134074] appearance-none cursor-pointer transition-all shadow-xs"
          >
            <option value="msme">🏭 MSME / Manufacturer (ISI / CRS)</option>
            <option value="jeweler">💎 Jeweler / AHC (Hallmarking & HUID)</option>
            <option value="consumer">🛡️ Consumer / Citizen (BIS Care)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-600">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 leading-tight">
          {persona === "msme" && "Tailored for factory audits, sample testing, Udyam 50% marking concessions & STI."}
          {persona === "jeweler" && "Focuses on 6-digit HUID laser sync, AHC assay tariffs, and karatage rules."}
          {persona === "consumer" && "Guides on scanning HUID in BIS Care App and reporting substandard ISI products."}
        </p>
      </div>

      {/* Primary Tools Menu */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
          Compliance & Regulatory Tools
        </span>

        <button
          onClick={() => onSelectTool("audit-wizard")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition-all ${
            activeTool === "audit-wizard"
              ? "bg-[#134074] text-white shadow-sm"
              : "text-[#0B2545] hover:bg-slate-100/80"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className={`w-4 h-4 ${activeTool === "audit-wizard" ? "text-[#D4AF37]" : "text-[#134074]"}`} />
            <span>New Compliance Audit</span>
          </div>
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
            activeTool === "audit-wizard" ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
          }`}>
            Wizard
          </span>
        </button>

        <button
          onClick={() => onSelectTool("standards-index")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition-all ${
            activeTool === "standards-index"
              ? "bg-[#134074] text-white shadow-sm"
              : "text-[#0B2545] hover:bg-slate-100/80"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <FileSearch className={`w-4 h-4 ${activeTool === "standards-index" ? "text-white" : "text-[#134074]"}`} />
            <span>Standard (IS) Index</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">10+ Grounded</span>
        </button>

        <button
          onClick={() => onSelectTool("fee-estimator")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition-all ${
            activeTool === "fee-estimator"
              ? "bg-[#134074] text-white shadow-sm"
              : "text-[#0B2545] hover:bg-slate-100/80"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Calculator className={`w-4 h-4 ${activeTool === "fee-estimator" ? "text-white" : "text-[#134074]"}`} />
            <span>Fee Estimator</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold font-mono">50% MSME</span>
        </button>

        <button
          onClick={() => onSelectTool("lab-locator")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition-all ${
            activeTool === "lab-locator"
              ? "bg-[#134074] text-white shadow-sm"
              : "text-[#0B2545] hover:bg-slate-100/80"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <MapPin className={`w-4 h-4 ${activeTool === "lab-locator" ? "text-white" : "text-[#134074]"}`} />
            <span>Laboratory Locator</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Pan-India</span>
        </button>
      </div>

      {/* Persona Recommended Fast Audits */}
      <div className="bg-[#F4F6F9] border border-slate-200 rounded-lg p-3 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#134074] block">
          Recommended Queries for You
        </span>
        <div className="space-y-1">
          {persona === "msme" && (
            <>
              <button
                onClick={() => onTriggerPresetQuery("How to apply for ISI Mark under Scheme-I for MSME?")}
                className="w-full text-left text-[11px] font-medium text-slate-700 hover:text-[#134074] hover:underline block truncate"
              >
                • Scheme-I ISI Mark application procedure
              </button>
              <button
                onClick={() => onTriggerPresetQuery("What is the 50% fee concession rule for Micro enterprises in BIS?")}
                className="w-full text-left text-[11px] font-medium text-slate-700 hover:text-[#134074] hover:underline block truncate"
              >
                • Udyam MSME 50% fee concession
              </button>
              <button
                onClick={() => onTriggerPresetQuery("Check licensing for IS 4151 Helmets")}
                className="w-full text-left text-[11px] font-medium text-slate-700 hover:text-[#134074] hover:underline block truncate"
              >
                • IS 4151 Two-Wheeler Helmets QCO
              </button>
            </>
          )}

          {persona === "jeweler" && (
            <>
              <button
                onClick={() => onTriggerPresetQuery("How to get a Hallmarking license")}
                className="w-full text-left text-[11px] font-medium text-slate-700 hover:text-[#134074] hover:underline block truncate"
              >
                • Jeweller registration & ₹0 fee policy
              </button>
              <button
                onClick={() => onTriggerPresetQuery("What is 6-digit HUID and how does AHC laser engrave it?")}
                className="w-full text-left text-[11px] font-medium text-slate-700 hover:text-[#134074] hover:underline block truncate"
              >
                • 6-digit HUID protocol & AHC mapping
              </button>
              <button
                onClick={() => onTriggerPresetQuery("What are the permitted gold purities under IS 1417:2016?")}
                className="w-full text-left text-[11px] font-medium text-slate-700 hover:text-[#134074] hover:underline block truncate"
              >
                • 14K, 18K, 20K, 22K, 24K karat fineness
              </button>
            </>
          )}

          {persona === "consumer" && (
            <>
              <button
                onClick={() => onTriggerPresetQuery("How to verify HUID and ISI mark using BIS Care App?")}
                className="w-full text-left text-[11px] font-medium text-slate-700 hover:text-[#134074] hover:underline block truncate"
              >
                • How to verify HUID on BIS Care App
              </button>
              <button
                onClick={() => onTriggerPresetQuery("How to report a fake ISI mark or counterfeit helmet?")}
                className="w-full text-left text-[11px] font-medium text-slate-700 hover:text-[#134074] hover:underline block truncate"
              >
                • File a complaint for fake ISI marks
              </button>
              <button
                onClick={() => onTriggerPresetQuery("Are all pressure cookers mandatory to have ISI mark?")}
                className="w-full text-left text-[11px] font-medium text-slate-700 hover:text-[#134074] hover:underline block truncate"
              >
                • Mandatory safety for pressure cookers
              </button>
            </>
          )}
        </div>
      </div>

      {/* Quick External Official Links */}
      <div className="space-y-1.5 pt-2 border-t border-slate-100">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block">
          Official BIS Portals
        </span>

        <a
          href="https://www.manakonline.in"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#0B2545] hover:bg-slate-100/70 border border-slate-200/60 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-[#134074]" />
            <span>Manakonline.in</span>
          </div>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>

        <a
          href="https://www.services.bis.gov.in"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#0B2545] hover:bg-slate-100/70 border border-slate-200/60 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#134074]" />
            <span>e-BIS Portal</span>
          </div>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>

        <a
          href="https://play.google.com/store/apps/details?id=com.bis.biscare"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#0B2545] hover:bg-slate-100/70 border border-slate-200/60 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Smartphone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>BIS Care App</span>
          </div>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>

      {/* Official Gov Emblem & Act Badge */}
      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
        <div className="flex items-center gap-1.5 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-[#134074]" />
          <span>Section 16, BIS Act 2016</span>
        </div>
        <span className="font-mono text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
          Gazette Compliant
        </span>
      </div>
    </aside>
  );
};
