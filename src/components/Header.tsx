import React from "react";
import { ShieldCheck, ExternalLink, Menu, X } from "lucide-react";
import { UserPersona } from "../types";

interface HeaderProps {
  persona: UserPersona;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenAuditWizard: () => void;
  onOpenFeeEstimator: () => void;
  onOpenStandardsIndex: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  persona,
  isSidebarOpen,
  onToggleSidebar,
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
    <header className="bg-[#0B2545] text-white sticky top-0 z-40 shadow-xs border-b border-[#134074]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15">
          {/* Brand, Sidebar Toggle & Title */}
          <div className="flex items-center gap-3">
            {/* Sidebar Collapse Toggle Button */}
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              title={isSidebarOpen ? "Collapse Navigation Sidebar" : "Expand Navigation Sidebar"}
              aria-label="Toggle navigation sidebar"
            >
              {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center p-1 shadow-inner">
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
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
                  <span>BIS Saathi</span>
                  <span className="text-[9px] uppercase font-semibold px-2 py-0.5 rounded bg-[#D4AF37] text-[#0B2545] tracking-wider">
                    GovTech
                  </span>
                </h1>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-300 font-medium tracking-normal">
                National Standards Compliance Portal • Bureau of Indian Standards
              </p>
            </div>
          </div>

          {/* Quick Header Actions & Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Active Persona Pill */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#134074]/60 border border-[#134074] text-xs text-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="font-medium text-[11px] sm:text-xs">{getPersonaLabel(persona)}</span>
            </div>

            {/* Quick Link to Manakonline */}
            <a
              href="https://www.manakonline.in"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1 px-3 py-1 rounded bg-[#134074] hover:bg-[#1d4f8f] text-xs font-semibold text-white transition-colors border border-white/10"
            >
              <span>Manakonline</span>
              <ExternalLink className="w-3 h-3 text-slate-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Subheader Gazette & Live Standards Status Strip */}
      <div className="bg-[#07192f] border-t border-[#134074]/60 px-4 sm:px-8 py-1 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap py-0.5">
          <span className="flex items-center gap-1 text-[#D4AF37] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            MANDATORY QCOs:
          </span>
          <span className="text-slate-300">Helmets (IS 4151)</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">Pressure Cookers (IS 2347)</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">Gold Hallmarking HUID (IS 1417)</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">Packaged Drinking Water (IS 14543)</span>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-slate-400 font-mono text-[10px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Gazette & Manuals v2.4</span>
        </div>
      </div>
    </header>
  );
};

