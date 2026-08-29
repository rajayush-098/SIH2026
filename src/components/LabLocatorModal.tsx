import React, { useState } from "react";
import { X, MapPin, Search, Phone, Mail, Building, CheckCircle2, ExternalLink } from "lucide-react";

interface LabLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TestingLab {
  id: string;
  name: string;
  type: "BIS Central Lab" | "BIS Regional Lab" | "NABL Recognized Partner";
  city: string;
  state: string;
  address: string;
  contact: string;
  email: string;
  standardsSupported: string[];
}

const SAMPLE_LABS: TestingLab[] = [
  {
    id: "cl-sahibabad",
    name: "BIS Central Laboratory (CL)",
    type: "BIS Central Lab",
    city: "Sahibabad (Ghaziabad)",
    state: "Uttar Pradesh",
    address: "Plot No. 20/9, Site IV, Sahibabad Industrial Area, Ghaziabad, UP - 201010",
    contact: "+91-120-2770200",
    email: "cl@bis.gov.in",
    standardsSupported: ["IS 4151 (Helmets)", "IS 2347 (Pressure Cookers)", "IS 1786 (Steel)", "IS 10500 (Drinking Water)", "IS 1293 (Plugs)"],
  },
  {
    id: "wrol-mumbai",
    name: "BIS Western Regional Office Laboratory",
    type: "BIS Regional Lab",
    city: "Mumbai",
    state: "Maharashtra",
    address: "Manakalaya, E9, MIDC, Andheri (East), Mumbai - 400093",
    contact: "+91-22-28329295",
    email: "wrol@bis.gov.in",
    standardsSupported: ["IS 4151 (Helmets)", "IS 1417 (Gold Hallmarking / AHC)", "IS 13252 (IT Goods)", "IS 16046 (Li-Ion Batteries)"],
  },
  {
    id: "srol-chennai",
    name: "BIS Southern Regional Office Laboratory",
    type: "BIS Regional Lab",
    city: "Chennai",
    state: "Tamil Nadu",
    address: "CIT Campus, IV Cross Road, Taramani, Chennai - 600113",
    contact: "+91-44-22541442",
    email: "srol@bis.gov.in",
    standardsSupported: ["IS 2347 (Pressure Cookers)", "IS 1293 (Plugs)", "IS 1786 (Steel)", "IS 1417 (Gold Assaying)"],
  },
  {
    id: "erol-kolkata",
    name: "BIS Eastern Regional Office Laboratory",
    type: "BIS Regional Lab",
    city: "Kolkata",
    state: "West Bengal",
    address: "1/14 C.I.T. Scheme VII M, V.I.P. Road, Kankurgachi, Kolkata - 700054",
    contact: "+91-33-23207080",
    email: "erol@bis.gov.in",
    standardsSupported: ["IS 1786 (Steel TMT)", "IS 10500 (Water)", "IS 4151 (Helmets)"],
  },
  {
    id: "nabl-shriram",
    name: "Shriram Institute for Industrial Research (NABL Accredited)",
    type: "NABL Recognized Partner",
    city: "Delhi",
    state: "Delhi",
    address: "19, University Road, Delhi - 110007",
    contact: "+91-11-27667267",
    email: "customercare@shriraminstitute.org",
    standardsSupported: ["IS 4151 (Helmets)", "IS 2347 (Cookers)", "IS 13252 (CRS)", "IS 16046 (Batteries)"],
  },
  {
    id: "nabl-tuv",
    name: "TUV Rheinland India Pvt Ltd (NABL / BIS Recognized)",
    type: "NABL Recognized Partner",
    city: "Bengaluru",
    state: "Karnataka",
    address: "Electronic City Phase 1, Bangalore - 560100",
    contact: "+91-80-46498000",
    email: "info@ind.tuv.com",
    standardsSupported: ["IS 13252 (CRS IT)", "IS 16046 (Lithium Batteries)", "IS 1293 (Plugs & Sockets)"],
  },
];

export const LabLocatorModal: React.FC<LabLocatorModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("all");

  if (!isOpen) return null;

  const filteredLabs = SAMPLE_LABS.filter((lab) => {
    const matchesSearch =
      lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.standardsSupported.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesState = selectedState === "all" || lab.state === selectedState;
    return matchesSearch && matchesState;
  });

  const states = Array.from(new Set(SAMPLE_LABS.map((l) => l.state)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2545]/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0B2545] text-white flex items-center justify-center">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0B2545]">
                BIS & NABL Recognized Testing Laboratory Directory
              </h3>
              <p className="text-xs text-slate-500">
                Locate accredited test houses for destructive sample testing & preliminary conformity verification
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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, lab name, or standard (e.g. Helmets, Cookers, Batteries)..."
              className="w-full pl-9 pr-4 py-2 bg-[#F4F6F9] border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-[#134074]"
            />
          </div>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-[#F4F6F9] border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-[#0B2545] focus:ring-2 focus:ring-[#134074]"
          >
            <option value="all">All States & Regions</option>
            {states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Labs List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredLabs.map((lab) => (
            <div
              key={lab.id}
              className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 space-y-3 hover:border-[#134074] transition-all"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#0B2545]">{lab.name}</h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        lab.type.includes("Central")
                          ? "bg-amber-100 text-amber-900 border border-amber-200"
                          : lab.type.includes("Regional")
                          ? "bg-blue-100 text-blue-900 border border-blue-200"
                          : "bg-emerald-100 text-emerald-900 border border-emerald-200"
                      }`}
                    >
                      {lab.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{lab.address}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#134074]" />
                  <span className="font-mono text-slate-700">{lab.contact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#134074]" />
                  <span className="font-mono text-slate-700">{lab.email}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Accredited Test Scopes:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {lab.standardsSupported.map((std, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-medium border border-slate-200"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Official LIMS Data Sync • Bureau of Indian Standards</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
