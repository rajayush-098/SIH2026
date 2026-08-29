import React, { useState } from "react";
import { X, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Factory, Layers } from "lucide-react";

interface AuditWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunAudit: (query: string) => void;
}

export const AuditWizardModal: React.FC<AuditWizardModalProps> = ({
  isOpen,
  onClose,
  onRunAudit,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("helmets");
  const [scale, setScale] = useState<string>("micro");
  const [hasUdyam, setHasUdyam] = useState<boolean>(true);
  const [goal, setGoal] = useState<string>("new-license");

  if (!isOpen) return null;

  const categories = [
    { id: "helmets", label: "Motorcycle Helmets (IS 4151)", icon: "🪖", desc: "Mandatory QCO, max 1.2kg weight, drop tests" },
    { id: "cookers", label: "Domestic Pressure Cookers (IS 2347)", icon: "🍲", desc: "Mandatory QCO, hydraulic proof & burst pressure" },
    { id: "gold", label: "Gold Jewelry & Artifacts (IS 1417)", icon: "💎", desc: "Mandatory Hallmarking, 6-digit HUID laser sync" },
    { id: "electronics", label: "IT & Electronic Products (IS 13252 / CRS)", icon: "💻", desc: "Scheme-II CRS Self-Declaration, safety testing" },
    { id: "steel", label: "High Strength TMT Steel Bars (IS 1786)", icon: "🏗️", desc: "Mandatory Steel QCO, yield strength, bend tests" },
    { id: "batteries", label: "Lithium-Ion Cells & Batteries (IS 16046)", icon: "🔋", desc: "CRS Registration, thermal abuse, overcharge safety" },
  ];

  const handleFinish = () => {
    let query = "";
    const catObj = categories.find((c) => c.id === selectedCategory);
    const catName = catObj ? catObj.label : "Product";

    if (selectedCategory === "helmets") {
      query = `Run comprehensive compliance audit for ${catName} under Scheme-I for a ${scale.toUpperCase()} enterprise (${
        hasUdyam ? "with Udyam Certificate" : "without Udyam"
      }) focusing on ${goal === "new-license" ? "new license grant, lab testing, and 50% marking fee" : "routine audit & STI testing"}.`;
    } else if (selectedCategory === "cookers") {
      query = `Perform full QCO compliance audit for ${catName} for a ${scale.toUpperCase()} manufacturer, detailing hydraulic tests, application fees, and mandatory documents.`;
    } else if (selectedCategory === "gold") {
      query = `Audit gold hallmarking compliance under IS 1417:2016 for jewelers, explaining zero registration fee, 6-digit HUID laser protocol, and AHC assay tariffs.`;
    } else if (selectedCategory === "electronics") {
      query = `Step-by-step Scheme-II Compulsory Registration Scheme (CRS) guide for ${catName} with MeitY guidelines and test report validity.`;
    } else {
      query = `Conduct compliance audit for ${catName} for ${scale.toUpperCase()} manufacturing unit (${
        hasUdyam ? "Udyam registered" : "standard"
      }).`;
    }

    onRunAudit(query);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2545]/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5">
        
        {/* Wizard Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0B2545] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0B2545]">
                New Compliance Audit Wizard
              </h3>
              <p className="text-xs text-slate-500">
                Step {step} of 3: {step === 1 ? "Select Product Category" : step === 2 ? "Enterprise Profile" : "Audit Objectives"}
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

        {/* Step Progress Bar */}
        <div className="flex items-center gap-2">
          <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-[#134074]" : "bg-slate-200"}`}></div>
          <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-[#134074]" : "bg-slate-200"}`}></div>
          <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? "bg-[#134074]" : "bg-slate-200"}`}></div>
        </div>

        {/* Step 1: Product Category */}
        {step === 1 && (
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              1. Which product or standard do you want to audit?
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
              {categories.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedCategory === c.id
                      ? "bg-blue-50/70 border-[#134074] ring-1 ring-[#134074]"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-xl">{c.icon}</span>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-[#0B2545]">{c.label}</h4>
                      <p className="text-[10px] text-slate-500 leading-tight">{c.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Enterprise Scale */}
        {step === 2 && (
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              2. What is your manufacturing classification?
            </span>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "micro", title: "Micro Enterprise", sub: "Investment < ₹1 Cr, Turnover < ₹5 Cr" },
                { id: "small", title: "Small Enterprise", sub: "Investment < ₹10 Cr, Turnover < ₹50 Cr" },
                { id: "medium", title: "Medium Enterprise", sub: "Investment < ₹50 Cr, Turnover < ₹250 Cr" },
                { id: "large", title: "Large Enterprise", sub: "Turnover > ₹250 Cr or Global" },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setScale(opt.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    scale === opt.id
                      ? "bg-blue-50/70 border-[#134074] ring-1 ring-[#134074]"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <h4 className="text-xs font-bold text-[#0B2545]">{opt.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{opt.sub}</p>
                </div>
              ))}
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5">
              <input
                type="checkbox"
                id="udyam-wizard"
                checked={hasUdyam}
                onChange={(e) => setHasUdyam(e.target.checked)}
                className="w-4 h-4 text-[#134074] rounded focus:ring-emerald-500"
              />
              <label htmlFor="udyam-wizard" className="text-xs text-emerald-950 font-semibold cursor-pointer">
                Registered on Udyam Portal (Applies 50% concession on application and marking fees)
              </label>
            </div>
          </div>
        )}

        {/* Step 3: Objective */}
        {step === 3 && (
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              3. What is your primary compliance objective?
            </span>

            <div className="space-y-2">
              {[
                { id: "new-license", title: "New License Grant (CML / Registration)", desc: "Need step-by-step workflow, lab equipment requirements, and application costs." },
                { id: "testing", title: "Mandatory Testing & Quality Control", desc: "Need exact NABL testing parameters, sampling frequency, and test charges." },
                { id: "qco-audit", title: "Market QCO Verification & Legal Liabilities", desc: "Understand gazette deadlines, legal consequences under BIS Act, and non-compliance penalties." },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setGoal(opt.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    goal === opt.id
                      ? "bg-blue-50/70 border-[#134074] ring-1 ring-[#134074]"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <h4 className="text-xs font-bold text-[#0B2545]">{opt.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as any)}
              className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => (s + 1) as any)}
              className="px-4 py-2 rounded-lg bg-[#134074] hover:bg-[#0B2545] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-5 py-2.5 rounded-lg bg-[#0B2545] hover:bg-[#134074] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Generate Grounded Compliance Audit</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
