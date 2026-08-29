export type UserPersona = "msme" | "jeweler" | "consumer";

export type ConformityScheme = 
  | "Scheme-I (ISI Mark)"
  | "Scheme-II (CRS)"
  | "Scheme-IV (Hallmarking)"
  | "Scheme-X (FMCS)"
  | "Scheme-X (Grant of Licence)";

export type QCOStatus = 
  | "Mandatory QCO" 
  | "Voluntary" 
  | "Hallmarking Mandate" 
  | "CRS Scheme" 
  | "Draft QCO"
  | "Clarification"
  | "System Introduction";

export interface SourceCitation {
  documentName: string;
  clause: string;
  gazetteRef?: string;
  verificationDate: string;
  checksum: string;
  snippet: string;
}

export interface FeeBreakdownItem {
  category: string;
  standardRate: string;
  msmeRate: string;
  remarks: string;
}

export interface LicensingStepItem {
  stepNumber: number;
  stepTitle: string;
  description: string;
  portal: string;
  timeline: string;
  mandatoryDocuments: string[];
}

export interface BISStandard {
  id: string;
  code: string;
  title: string;
  hindiTitle?: string;
  referenceNumber?: string;
  publishDate?: string;
  domain: string;
  scheme: ConformityScheme;
  ministry: string;
  qcoStatus: QCOStatus;
  qcoNotificationNumber: string;
  qcoDate: string;
  effectiveDate: string;
  scope: string;
  sampleSize: string;
  keyTests: string[];
  applicationFee: string;
  annualMarkingFee: string;
  msmeConcession: string;
  applicableLabCategories: string[];
  sourceDocument: SourceCitation;
}

export interface StructuredAIResponse {
  title: string;
  standardCode: string;
  statusBadge: QCOStatus;
  executiveSummary: string;
  feeBreakdown?: FeeBreakdownItem[];
  licensingSteps?: LicensingStepItem[];
  technicalRequirements?: string[];
  sourceCitation: SourceCitation;
  warningOrNote?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "saathi" | "ai";
  timestamp: string;
  text?: string;
  language?: "en" | "hi" | "mr";
  structuredResponse?: StructuredAIResponse;
  rawMarkdown?: string;
  isFallback?: boolean;
}

export interface TestingLab {
  id: string;
  name: string;
  code: string;
  city: string;
  state: string;
  region: "Northern" | "Western" | "Southern" | "Eastern" | "Central";
  type: "Central Laboratory" | "Regional Laboratory" | "Branch Laboratory" | "NABL Recognized Commercial";
  accreditedStandards: string[];
  contact: string;
  address: string;
}
