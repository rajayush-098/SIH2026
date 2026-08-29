import React from "react";
import { ShieldCheck, FileText, CheckCircle2, Globe, ExternalLink, HelpCircle } from "lucide-react";
import { UserPersona } from "../types";

interface HeaderProps {
  persona: UserPersona;
  onOpenAuditWizard: () => void;
  onOpenFeeEstimator: () => void;
  onOpenStandardsIndex: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  persona,
  onOpenAuditWizard,
  onOpenFeeEstimator,
  onOpenStandardsIndex
}) => {
  const getPersonaLabel = (p: UserPersona) => {
    switch (p) {
      case "msme":
        return "MSME / Manufacturer View";
      case "jeweler":
        return "Jeweler / AHC View";
      case "consumer":
        return "Citizen & Consumer View";
    }
  };

  return (
    <header className="bg-[#0B2545] text-white border-b border-[#134074] sticky top-0 z-40 shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center p-1.5 shadow-inner">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="46" fill="#0B2545" stroke="#D4AF37" strokeWidth="4" />
                <path
                  d="M50 15 L78 32 L78 68 L50 85 L22 68 L22 32 Z"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                />
                <circle cx="50" cy="50" r="14" fill="#D4AF37" />
                <path d="M42 50 L47 55 L58 44" stroke="#0B2545" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
                  <span>BIS Saathi</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#D4AF37] text-[#0B2545] tracking-wider">
                    GovTech Standards
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-300 font-medium tracking-wide">
                National Standards Compliance Portal • Bureau of Indian Standards
              </p>
            </div>
          </div>

          {/* Quick Header Actions & Status */}
          <div className="hidden md:flex items-center gap-3">
            {/* Active Persona Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#134074]/60 border border-[#134074] text-xs text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium">{getPersonaLabel(persona)}</span>
            </div>

            {/* Gazette Order Status Ticker */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>BIS Act 2016 & QCO Regulations Active</span>
            </div>

            {/* Quick Links */}
            <a
              href="https://www.manakonline.in"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#134074] hover:bg-[#1d4f8f] text-xs font-semibold text-white transition-colors border border-white/10"
            >
              <span>Manakonline</span>
              <ExternalLink className="w-3 h-3 text-slate-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Subheader Gazette & Live Standards Status Strip */}
      <div className="bg-[#07192f] border-t border-[#134074]/80 px-4 sm:px-8 py-1 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap py-0.5">
          <span className="flex items-center gap-1 text-[#D4AF37] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            MANDATORY QCO ORDERS:
          </span>
          <span className="text-slate-300">Helmets (IS 4151)</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">Pressure Cookers (IS 2347)</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">Gold Hallmarking HUID (IS 1417)</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">IT Goods CRS (IS 13252)</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">TMT Steel (IS 1786)</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-slate-400">
          <span className="font-mono text-[10px]">Portal Engine v2.4 (Grounded RAG)</span>
        </div>
      </div>
    </header>
  );
};
