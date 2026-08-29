import React, { useState } from "react";
import { X, Search, Filter, ShieldCheck, FileText, ArrowRight, ExternalLink } from "lucide-react";
import { BISStandard } from "../types";

interface StandardsIndexModalProps {
  isOpen: boolean;
  onClose: () => void;
  standards: BISStandard[];
  onSelectStandard: (std: BISStandard) => void;
  onAskAboutStandard: (query: string) => void;
}

export const StandardsIndexModal: React.FC<StandardsIndexModalProps> = ({
  isOpen,
  onClose,
  standards,
  onSelectStandard,
  onAskAboutStandard,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScheme, setSelectedScheme] = useState<string>("all");

  if (!isOpen) return null;

  const filteredStandards = standards.filter((std) => {
    const matchesSearch =
      std.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.ministry.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesScheme =
      selectedScheme === "all" || std.scheme.toLowerCase().includes(selectedScheme.toLowerCase());

    return matchesSearch && matchesScheme;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2545]/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0B2545] text-white flex items-center justify-center font-bold">
              IS
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0B2545]">
                Indian Standards (IS) Directory & QCO Index
              </h3>
              <p className="text-xs text-slate-500">
                Browse official BIS standards with Gazette QCO notifications and conformity schemes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by IS code (e.g. IS 4151, IS 1417), product name, or ministry..."
              className="w-full pl-9 pr-4 py-2 bg-[#F4F6F9] border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#134074]"
            />
          </div>

          <select
            value={selectedScheme}
            onChange={(e) => setSelectedScheme(e.target.value)}
            className="bg-[#F4F6F9] border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#134074]"
          >
            <option value="all">All Schemes</option>
            <option value="Scheme-I">Scheme-I (ISI Mark)</option>
            <option value="Scheme-II">Scheme-II (CRS Electronics)</option>
            <option value="Scheme-IV">Scheme-IV (Hallmarking)</option>
          </select>
        </div>

        {/* Standards Grid/List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredStandards.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              No matching standards found for "{searchQuery}".
            </div>
          ) : (
            filteredStandards.map((std) => (
              <div
                key={std.id}
                className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 hover:border-[#134074] transition-all space-y-2.5"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#0B2545] bg-white px-2 py-0.5 rounded border border-slate-200">
                        {std.code}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          std.qcoStatus.includes("Mandatory") || std.qcoStatus.includes("Hallmarking")
                            ? "bg-red-100 text-red-800 border border-red-200"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                        }`}
                      >
                        {std.qcoStatus}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {std.scheme}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0B2545]">
                      {std.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onSelectStandard(std);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded bg-white hover:bg-slate-100 border border-slate-300 text-xs font-semibold text-[#134074] flex items-center gap-1 transition-colors"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onAskAboutStandard(`Audit compliance and fees for ${std.code} (${std.title})`);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded bg-[#134074] hover:bg-[#0B2545] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>Run AI Audit</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {std.scope}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Ministry / Authority:</span>
                    <span className="font-medium text-slate-800 truncate block">{std.ministry}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">App & Marking Fee:</span>
                    <span className="font-medium text-slate-800 truncate block">{std.applicationFee.split("+")[0]}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">MSME Incentive:</span>
                    <span className="font-medium text-emerald-700 truncate block">{std.msmeConcession}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Source: BIS Official Product Manuals & Departmental Gazette Orders</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors"
          >
            Close Index
          </button>
        </div>
      </div>
    </div>
  );
};
