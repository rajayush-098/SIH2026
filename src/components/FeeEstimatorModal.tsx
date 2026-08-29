import React, { useState } from "react";
import { X, Calculator, ShieldCheck, CheckCircle, Percent, AlertCircle } from "lucide-react";

interface FeeEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConsultSaathi: (query: string) => void;
}

export const FeeEstimatorModal: React.FC<FeeEstimatorModalProps> = ({
  isOpen,
  onClose,
  onConsultSaathi,
}) => {
  const [scheme, setScheme] = useState<"scheme-1" | "crs" | "hallmarking">("scheme-1");
  const [enterpriseScale, setEnterpriseScale] = useState<"micro" | "small" | "medium" | "large">("micro");
  const [auditDays, setAuditDays] = useState<number>(2);
  const [productionUnits, setProductionUnits] = useState<number>(50000);
  const [isUdyamRegistered, setIsUdyamRegistered] = useState<boolean>(true);

  if (!isOpen) return null;

  // Calculation logic based on authentic BIS Gazette Fee structure
  const isEligibleFor50Percent = isUdyamRegistered && (enterpriseScale === "micro" || enterpriseScale === "small");

  let appFee = 1000;
  if (isEligibleFor50Percent && scheme === "scheme-1") {
    appFee = 500;
  }

  let auditChargePerDay = 7000;
  let totalAuditCost = scheme === "scheme-1" ? auditChargePerDay * auditDays : 0;

  let baseMarkingFee = 45000;
  let unitMarkingRate = 0.15;

  if (scheme === "crs") {
    appFee = 1000;
    baseMarkingFee = 50000; // MeitY registration fee
    totalAuditCost = 0; // No physical factory audit in CRS
  } else if (scheme === "hallmarking") {
    appFee = 1000;
    baseMarkingFee = productionUnits * 45; // ₹45 per piece
    totalAuditCost = 0;
  }

  let effectiveMarkingFee = baseMarkingFee;
  if (scheme === "scheme-1") {
    const volumeCalculatedFee = productionUnits * unitMarkingRate;
    const computed = Math.max(baseMarkingFee, volumeCalculatedFee);
    effectiveMarkingFee = isEligibleFor50Percent ? computed * 0.5 : computed;
  }

  const estimatedLabTesting = scheme === "scheme-1" ? 20000 : scheme === "crs" ? 45000 : 5000;
  const subtotal = appFee + totalAuditCost + effectiveMarkingFee + estimatedLabTesting;
  const gst18 = subtotal * 0.18;
  const grandTotal = subtotal + gst18;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2545]/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0B2545] text-white flex items-center justify-center">
              <Calculator className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0B2545]">
                BIS Certification Fee & MSME Concession Estimator
              </h3>
              <p className="text-xs text-slate-500">
                Calculate official government statutory fees, factory inspection tariffs, and Udyam rebates
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

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Scheme Selection */}
          <div className="space-y-1">
            <label className="font-bold text-[#0B2545]">Conformity Scheme:</label>
            <select
              value={scheme}
              onChange={(e) => setScheme(e.target.value as any)}
              className="w-full bg-[#F4F6F9] border border-slate-300 rounded-lg p-2.5 font-semibold text-[#0B2545] focus:ring-2 focus:ring-[#134074]"
            >
              <option value="scheme-1">Scheme-I: ISI Mark (Manufacturing License)</option>
              <option value="crs">Scheme-II: Compulsory Registration (CRS - Electronics)</option>
              <option value="hallmarking">Scheme-IV: Gold / Silver Hallmarking (HUID)</option>
            </select>
          </div>

          {/* Enterprise Scale */}
          <div className="space-y-1">
            <label className="font-bold text-[#0B2545]">Enterprise Classification:</label>
            <select
              value={enterpriseScale}
              onChange={(e) => setEnterpriseScale(e.target.value as any)}
              className="w-full bg-[#F4F6F9] border border-slate-300 rounded-lg p-2.5 font-semibold text-[#0B2545] focus:ring-2 focus:ring-[#134074]"
            >
              <option value="micro">Micro Enterprise (Turnover &lt; ₹5 Cr)</option>
              <option value="small">Small Enterprise (Turnover &lt; ₹50 Cr)</option>
              <option value="medium">Medium Enterprise (Turnover &lt; ₹250 Cr)</option>
              <option value="large">Large / Non-MSME Enterprise</option>
            </select>
          </div>

          {/* Udyam Registration Checkbox */}
          <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <input
              type="checkbox"
              id="udyam-check"
              checked={isUdyamRegistered}
              onChange={(e) => setIsUdyamRegistered(e.target.checked)}
              className="w-4 h-4 text-[#134074] rounded focus:ring-emerald-500"
            />
            <label htmlFor="udyam-check" className="text-xs text-emerald-900 font-semibold cursor-pointer">
              Holding valid Udyam Registration Certificate (50% Concession)
            </label>
          </div>

          {/* Estimated Annual Volume */}
          <div className="space-y-1">
            <label className="font-bold text-[#0B2545]">
              {scheme === "hallmarking" ? "Articles Hallmarked / Year:" : "Annual Production Volume (Units):"}
            </label>
            <input
              type="number"
              value={productionUnits}
              onChange={(e) => setProductionUnits(Number(e.target.value) || 0)}
              className="w-full bg-[#F4F6F9] border border-slate-300 rounded-lg p-2 font-mono text-slate-800 focus:ring-2 focus:ring-[#134074]"
            />
          </div>

          {/* Factory Audit Days (for Scheme-I) */}
          {scheme === "scheme-1" && (
            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-[#0B2545]">
                Preliminary Factory Audit Duration: {auditDays} Man-Day(s) (₹7,000 / day)
              </label>
              <input
                type="range"
                min={1}
                max={5}
                value={auditDays}
                onChange={(e) => setAuditDays(Number(e.target.value))}
                className="w-full accent-[#134074]"
              />
            </div>
          )}
        </div>

        {/* Calculated Breakdown Card */}
        <div className="bg-[#0B2545] text-white p-5 rounded-xl space-y-3 shadow-md border border-[#134074]">
          <div className="flex items-center justify-between border-b border-white/15 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Itemized Fee Breakdown
            </span>
            {isEligibleFor50Percent && (
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-400/30">
                50% MSME Rebate Applied
              </span>
            )}
          </div>

          <div className="space-y-2 text-xs divide-y divide-white/10">
            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-300">1. Online Application Processing Fee:</span>
              <span className="font-mono font-bold text-white">₹{appFee.toLocaleString()}</span>
            </div>

            {scheme === "scheme-1" && (
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-300">2. Factory Inspection Charges ({auditDays} days):</span>
                <span className="font-mono font-bold text-white">₹{totalAuditCost.toLocaleString()}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-300">
                {scheme === "crs" ? "2. MeitY Registration Fee (2 Years):" : "3. Minimum Annual Marking / Assaying Fee:"}
              </span>
              <span className="font-mono font-bold text-amber-300">₹{effectiveMarkingFee.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-300">4. Estimated Independent NABL Lab Testing:</span>
              <span className="font-mono font-bold text-white">₹{estimatedLabTesting.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-300">Applicable GST @ 18%:</span>
              <span className="font-mono text-slate-300">₹{Math.round(gst18).toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between pt-2 text-sm font-bold text-white border-t-2 border-white/20">
              <span className="text-emerald-300 uppercase">Estimated Total Initial Outlay:</span>
              <span className="font-mono text-base text-[#D4AF37]">₹{Math.round(grandTotal).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <button
            onClick={() => {
              onConsultSaathi(
                `Explain the complete fee structure and 50% concession for ${scheme.toUpperCase()} for a ${enterpriseScale.toUpperCase()} enterprise with annual volume of ${productionUnits} units.`
              );
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-[#134074] hover:bg-[#0B2545] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>Ask BIS Saathi to Verify Calculation</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
