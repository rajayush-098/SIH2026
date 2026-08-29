// Official Knowledge Base extracted directly from the attached Bureau of Indian Standards (BIS) PDF Documents

export interface PDFDocumentEntry {
  id: string;
  fileName: string;
  title: string;
  standardCode?: string;
  scheme: string;
  qcoStatus: string;
  referenceNumber: string;
  publishDate: string;
  clauses: {
    clauseNumber: string;
    heading: string;
    text: string;
  }[];
  keyHighlights: string[];
  fullTextSummary: string;
}

export const ATTACHED_BIS_PDF_DOCUMENTS: PDFDocumentEntry[] = [
  {
    id: "doc-is-2347-2023",
    fileName: "BIS_IS_2347_2023_Pressure_Cooker_Manual.pdf",
    title: "Product Manual for Domestic Pressure Cooker as per IS 2347:2023",
    standardCode: "IS 2347:2023",
    scheme: "Scheme-I (ISI Mark)",
    qcoStatus: "Mandatory QCO",
    referenceNumber: "PM/ IS 2347/9/February 2025",
    publishDate: "February 2025",
    clauses: [
      {
        clauseNumber: "Clause 1.0 & Clause 6.0",
        heading: "Scope of the Licence & Amendments",
        text: "Licence is granted to use Standard Mark as per IS 2347:2023 for Domestic Pressure Cooker. Covers Capacities, Type of coating (Hard Anodized/Non-stick/Powder coated/Ceramic coated/High temperature resistant liquid coated), Lid (Inner Lid/Outer Lid/Cooker fastened by Screw clamp or any other locking device), Material (Aluminium Alloy/Stainless Steel/3-ply construction), Nature of bottom/base (Induction friendly/Composite bottom), Safety Pressure Relief Device (Resettable/Destructible)."
      },
      {
        clauseNumber: "Clause 2(c)",
        heading: "Sampling Guidelines and Sample Size",
        text: "Sample Size: One Pressure Cooker (Two, in case of Induction bottom). In addition one additional gasket, PRD, SRD as necessary shall also be drawn."
      },
      {
        clauseNumber: "Clause 2.2 of Annex-D",
        heading: "MSME In-House Testing Laboratory Concession",
        text: "For MSME manufacturers, the requirement of maintaining a laboratory/in-house testing facility for routine tests (indicated as 'R' in Column 2 of Table 1) is also optional. MSME manufacturers may utilize common cluster based facilities as per guidelines for the utilization of cluster based test facilities by MSMEs or the provisions of Sharing of testing facilities or get testing done from BIS recognized/empaneled laboratory or any other laboratory having valid NABL accreditation as per IS/ISO/IEC 17025."
      },
      {
        clauseNumber: "Annex-B (Clause 1.a)",
        heading: "Nominal Capacity Grouping for Testing",
        text: "Grouping parameters: Group I (1 to 6.5 litres), Group II (7 to 15.5 litres), Group III (16 to 24 litres). Pressure Cooker (of highest nominal capacity) of same Type from each group shall be tested to cover all nominal capacities from the particular group."
      },
      {
        clauseNumber: "Annex-C & Clause 8.1 - 8.17",
        heading: "List of Mandatory Test Equipment & Tests",
        text: "Includes: Air Pressure Test (Cl 8.1), Proof Pressure Test (Cl 8.2), Operating Pressure Test of PRD (Cl 8.3), Safety Pressure Relief Device Test (Cl 8.4), Bursting Pressure Test (Cl 8.5), Test for Removal of Lid under pressure (Cl 8.6), Spring Loaded Mechanism (Cl 8.7), Composite Bottom Test (Cl 8.8), Induction Bottom Test (Cl 8.9), External Coating (Cl 8.11), Internal Non-Stick Coating as per IS 9730 (Cl 8.12), Electrical Requirements as per IS 302-2-15 (Cl 8.13)."
      },
      {
        clauseNumber: "Annex-E",
        heading: "Guidelines on Sharing of Manufacturing Facilities for Anodizing",
        text: "Both supplier and receiver manufacturers must have BIS licence for Domestic Pressure Cooker as per IS 2347:2023. The product shall be marked with BIS Certification Marks licence no. of the supplier licensee, who bears the onus for final quality."
      }
    ],
    keyHighlights: [
      "IS 2347:2023 covers Domestic Pressure Cookers up to 24 Litres across 3 capacity groups",
      "Sample size is 1 Cooker (2 for Induction bottom) plus additional gasket, PRD, SRD",
      "MSMEs have optional in-house routine test lab requirements and can use cluster/NABL labs",
      "Proof pressure test requires hydrostatic verification, bursting pressure test, and PRD operation test",
      "Annex-E permits sharing anodizing facilities between licensed BIS manufacturers"
    ],
    fullTextSummary: "Official Product Manual PM/ IS 2347/9/February 2025 under Scheme-I of BIS (Conformity Assessment) Regulations 2018 for domestic pressure cookers."
  },
  {
    id: "doc-is-4151-2015",
    fileName: "BIS_IS_4151_2015_Helmet_Product_Manual.pdf",
    title: "Product Manual for Protective Helmet for Two Wheeler Riders According to IS 4151: 2015",
    standardCode: "IS 4151:2015",
    scheme: "Scheme-I (ISI Mark)",
    qcoStatus: "Mandatory QCO",
    referenceNumber: "PM/ IS 4151/ 1/ January 2019",
    publishDate: "January 2019",
    clauses: [
      {
        clauseNumber: "Clause 2(c)",
        heading: "Sampling Guidelines and Sample Size",
        text: "Sample Size: 8 Helmets - for all tests. Each variety of helmet shall be tested to cover that variety in the licence."
      },
      {
        clauseNumber: "Clause 5.0",
        heading: "Possible Tests in a Day",
        text: "(i) Sizes (Clause 5), (ii) Constructional requirement (Clause 6.1 to 6.6), (iii) Peripheral vision (Clause 6.7), (iv) Workmanship and Finish (Clause 6.8), (v) Mass (Clause 6.9), (vi) Dynamic test of retention system (Clause 7.5)."
      },
      {
        clauseNumber: "Clause 3.2 of Annex-B",
        heading: "Visor Labeling and User Instructions",
        text: "Each visor shall be tagged with a printed card having the following information: a) To maintain a good field of vision, formation of scratches and accumulation of dirt on the visor screen shall be avoided. b) No organic solvents or materials containing organic solvents such as metal polish, wax and polish shall be used to clean the visor screen. c) A soft cloth shall be used to wipe the visor for removing dust, dirt etc."
      },
      {
        clauseNumber: "Annex-A & Annex-B (Table 1)",
        heading: "Mechanical and Retention Tests",
        text: "Metal parts corrosion resistance (Cl 4.5), Visor impact & flammability (Cl 4.6 / IS 9973), Shell examination (Cl 6.2), Peripheral vision (Cl 6.7), Mass check (Cl 6.9), Impact absorption test (Cl 7.2 / Annex C), Rigidity test (Cl 7.3 / Annex D), Dynamic test of retention system (Cl 7.5 / Annex F), Audibility test (Cl 7.6 / Annex G), Retention detaching test (Cl 7.7 / Annex H), Micro-slip test of chin strap (Cl 7.8 / Annex J), Abrasion resistance of chin strap (Cl 7.9), Quick release mechanism tests (Cl 7.10)."
      },
      {
        clauseNumber: "Table 1 Footnote",
        heading: "Retesting Protocol upon Sample Failure",
        text: "In case of failure of sample in any of the requirements as per clauses 6.7, 7.2, 7.3, 7.4, 7.6, 7.8, 7.9 and 7.10, samples from two consecutive control units shall be tested for the requirement in which failure has occurred."
      }
    ],
    keyHighlights: [
      "Mandatory sample size: 8 helmets for complete type testing",
      "Covers helmets with or without lower face cover and with/without visor",
      "Visor must have scratch warnings and prohibition of organic solvents/polish",
      "Rigorous tests include Impact Absorption, Dynamic Retention with 10kg falling mass, Micro-slip, and Peripheral Vision"
    ],
    fullTextSummary: "Official Product Manual PM/ IS 4151/ 1/ January 2019 for Scheme-I certification of protective motorcycle helmets."
  },
  {
    id: "doc-is-15820-2024",
    fileName: "BIS_Hallmarking_Guidelines_IS_15820_2024.pdf",
    title: "Guidelines for Implementation of Revised Indian Standard IS 15820:2024 for Assaying and Hallmarking Centres",
    standardCode: "IS 15820:2024",
    scheme: "Mandatory Hallmarking",
    qcoStatus: "Hallmarking Mandate",
    referenceNumber: "Ref: HMD/14:44",
    publishDate: "29 July 2024",
    clauses: [
      {
        clauseNumber: "Section 2 & Section 5.A(i)",
        heading: "Alignment with ISO 17025 and Withdrawal Date",
        text: "IS 15820:2009 has been revised as IS 15820:2024 to align with the requirements laid down in IS/ISO/IEC 17025:2017 'General Requirements for the competence of testing and calibration laboratories (second revision)'. The last date for implementation of the revised standard is 01 November 2024 after which the old standard shall stand withdrawn."
      },
      {
        clauseNumber: "Table Item 3 (Clause 6.3)",
        heading: "Mandatory 30-Day CCTV Recording",
        text: "Requirement of CCTV recording of 30 days for security as well as verification of the activities (Cl 6.3). AHCs are required to ensure that all the activities carried out in the centre are clearly recorded by the CCTV cameras (To be verified during audit)."
      },
      {
        clauseNumber: "Table Item 4 (Clause 7.4.4)",
        heading: "Increased Insurance Amount for Jewellery",
        text: "Insurance amount for Jewellery/Artefacts increased from 10 lakhs to 40 lakhs minimum (Cl 7.4.4). AHCs are required to ensure conformity to this requirement and a copy of the insurance is to be sent to the concerned HMO."
      },
      {
        clauseNumber: "Table Item 6 (Clause 7.8.2)",
        heading: "Mandatory Proficiency Testing (PT)",
        text: "Requirement of PT made mandatory for gold and silver jewellery for grades as per IS 1417 and IS 2112 respectively (Cl 7.8.2). Declaration wrt the schedule for participation in PT shall be submitted by the centres to concerned HMO."
      },
      {
        clauseNumber: "Table Item 7 (Clause 7.9.4)",
        heading: "New Laser Marking Size for Articles Under 2 Grams",
        text: "New size for laser marking introduced: 0.3 mm for articles below 2 grams (Cl 7.9.4). AHCs may make necessary adjustments in their laser marking machines for hallmarking articles below 2 grams."
      },
      {
        clauseNumber: "Table Item 9 (Annex-B)",
        heading: "Reference Gold Samples Requirements",
        text: "Requirement of reference gold samples of 585, 833, 958 and 995 ppt fineness for internal checks has been added in addition to 750 and 916 samples in Annex-B (Sl. No. (i)-gg of Annex-B)."
      },
      {
        clauseNumber: "Table Item 11 (Annex-D)",
        heading: "Certified Reference Materials & Bhartiya Nirdeshak Dravya (BND)",
        text: "Requirement of Certified values of certified reference materials provided by IS 17034 accredited Reference Material Producer or IS 17025 accredited centre having accredited scope / Bhartiya Nirdeshak Dravya (BND) for Gold/silver standards for XRF and proof metals (IS 1418 / IS 2113)."
      }
    ],
    keyHighlights: [
      "Implementation deadline is 01 November 2024; replaces IS 15820:2009",
      "Mandatory 30-day continuous CCTV recording of all center operations",
      "Minimum insurance for jewellery in custody quadrupled from ₹10 Lakhs to ₹40 Lakhs",
      "New 0.3 mm micro-laser mark size introduced for light jewellery below 2g",
      "Mandatory Proficiency Testing (PT) and reference gold samples for 585, 833, 958, 995 ppt"
    ],
    fullTextSummary: "Official BIS Hallmarking Department circular HMD/14:44 establishing mandatory operation guidelines for IS 15820:2024."
  },
  {
    id: "doc-old-gold-ahc",
    fileName: "BIS_Consumer_Old_Gold_Testing_Guidelines.pdf",
    title: "Guidelines on Testing of Old Gold Lying with Consumers from BIS Recognized AHC",
    standardCode: "IS 15820 / IS 1418",
    scheme: "Mandatory Hallmarking",
    qcoStatus: "Hallmarking Mandate",
    referenceNumber: "Annexure-I Guidelines",
    publishDate: "2022",
    clauses: [
      {
        clauseNumber: "Item a & b",
        heading: "Consumer Submission and Lot Size",
        text: "Consumer can bring one or multiple pieces of jewellery lying with them for testing to BIS recognized Assaying and hallmarking centre (AHC). The lot brought by the consumer upto 10 pieces may be considered as a mixed lot and tested as per the provisions of mixed lots mentioned in IS 15820: 2009."
      },
      {
        clauseNumber: "Item e & g",
        heading: "XRF Testing and Prohibited Elements",
        text: "Each jewellery piece should be individually checked by XRF for purity of gold and also for the absence of prohibited elements such as Iridium, Ruthenium, Cadmium and Osmium. XRF gives gold content of surface only and the purity checked by XRF may vary by ±5 ppt."
      },
      {
        clauseNumber: "Item k & l(viii)",
        heading: "Statutory Testing Tariff for Consumers",
        text: "AHC shall charge Rs 45 per article for testing from consumer, however the minimum charges for one lot shall be Rs 200."
      },
      {
        clauseNumber: "Item l(iii), (iv) & (v)",
        heading: "Fire Assaying Sample Quantity and Return of Pure Cornets",
        text: "Around 300 mg to 500 mg of sample is required to ascertain purity of gold jewellery by fire assaying (destructive). After completion of fire assaying process pure gold cornets obtained from the sample and remnants shall be returned to the consumer on the same day (or cornet returned next day)."
      },
      {
        clauseNumber: "Item l(i) & (ii)",
        heading: "Mandatory Consumer Notice Display",
        text: "AHC must inform and prominently display that purity is tested by two methods: a) XRF method (non-destructive surface only, purity certificate cannot be issued solely on XRF) and b) Fire assaying method (destructive, most accurate globally)."
      }
    ],
    keyHighlights: [
      "Consumers can test up to 10 pieces of old jewellery per lot at any BIS recognized AHC",
      "Statutory fee is strictly ₹45 per article with a minimum of ₹200 per lot",
      "XRF checks for banned toxic elements: Iridium, Ruthenium, Cadmium, Osmium (surface ±5 ppt)",
      "Fire assay draws 300mg-500mg sample; pure gold cornets and remnants must be returned to the consumer",
      "Standard test report issued under Annexure-II format with article photo, weight, and mean purity"
    ],
    fullTextSummary: "Official Guidelines Annexure-I on consumer old gold testing at BIS AHCs."
  },
  {
    id: "doc-scheme-x-gol",
    fileName: "BIS_Scheme_X_Grant_of_Licence_Guidelines_2023.pdf",
    title: "Guidelines for Grant of Licence (GoL) as per Conformity Assessment Scheme-X of Schedule-II of BIS Regulations 2018",
    standardCode: "Scheme-X / Form-I",
    scheme: "Scheme-X (Grant of Licence)",
    qcoStatus: "Mandatory QCO",
    referenceNumber: "CMD-I/2:17:1",
    publishDate: "02 June 2023",
    clauses: [
      {
        clauseNumber: "Clause 1.0 & Clause 2.0",
        heading: "General Principles & Form-I Application",
        text: "The Bureau grants a licence based on successful assessment of the technical file submitted by the manufacturer which includes review of product compliance report as per specified requirements supported through evaluation carried out during visit to manufacturing premises. The application shall be made in Form-I."
      },
      {
        clauseNumber: "Clause 11(i)",
        heading: "Inspection Visit Duration",
        text: "Duration of the inspection visit shall normally be two days in case of Indian manufacturers and three days in case of foreign manufacturers. For each additional technical file, an extra man-day may be assigned."
      },
      {
        clauseNumber: "Clause 13(i) & (ii)",
        heading: "Processing Timelines for Grant of Licence",
        text: "Process of grant of licence is expected to be completed within 60 days from the date of receipt of the application. For first ever product certification cases, Head (BO) shall ensure expeditious processing so that licence may be granted within 90 days."
      },
      {
        clauseNumber: "Clause 13(iii)",
        heading: "Initial Licence Validity Period",
        text: "The licence to use Standard Mark shall initially be granted for not less than three years and upto six years."
      },
      {
        clauseNumber: "Clause 15(ii) & Annexure-VIII",
        heading: "Rejection Notice Period and Appeal to Director General",
        text: "Before rejecting an application, a rejection notice of not less than 21 days shall be given to the applicant (Annexure-VII). If aggrieved, applicant may prefer an appeal to the Director General, BIS within 90 days from date of order with a fee of ₹2,000 as per Section 34 of BIS Act 2016 read with Rule 37."
      },
      {
        clauseNumber: "Annexure-IX",
        heading: "Foreign Manufacturers Certification Scheme (FMCS) Requirements",
        text: "All foreign manufacturers considered 'Large Scale'. Must nominate Authorised Indian Representative (AIR) who is an Indian resident and graduate. Fees: Visit charges INR 20,000 per manday (per diem days + 3 days); Contingency fund INR 10,000 per licence; Performance Bank Guarantee (PBG) of USD 10,000 valid for 6 months beyond licence."
      }
    ],
    keyHighlights: [
      "Application in Form-I with complete technical file, machinery declarations (Annex-II), test equipment (Annex-III)",
      "Standard audit duration: 2 days for Indian factories, 3 days for Foreign factories",
      "Turnaround time: 60 days standard, 90 days for first-time product standards",
      "Licence validity is granted initially for 3 to 6 years",
      "Rejection requires 21-day show cause notice; appeal to DG BIS costs ₹2,000 within 90 days",
      "FMCS requires Authorised Indian Representative (AIR), ₹20,000/manday audit fees, and $10,000 USD Bank Guarantee"
    ],
    fullTextSummary: "Comprehensive Scheme-X certification guidelines CMD-I/2:17:1 issued 02 June 2023 by Central Marks Department-I."
  },
  {
    id: "doc-qco-guidance",
    fileName: "BIS_QCO_Guidance_Document.pdf",
    title: "Guidance Document on Quality Control Orders (QCOs)",
    standardCode: "BIS Act 2016 (Sec 16, 17, 25, 29)",
    scheme: "Scheme-I (ISI Mark)",
    qcoStatus: "Mandatory QCO",
    referenceNumber: "BIS QCO Guidance 2024",
    publishDate: "2024",
    clauses: [
      {
        clauseNumber: "Section 2.1",
        heading: "Statutory Authority under BIS Act 2016",
        text: "The Central Government, after consulting BIS, publishes QCOs in exercise of powers conferred by sub-sections (1) and (2) of section 16 read in conjunction with section 17 and sub-section (3) of section 25 of the BIS Act, 2016 thereby bringing products under BIS Mandatory Certification."
      },
      {
        clauseNumber: "Section 5.1",
        heading: "Prohibition Orders on Non-Certified Goods",
        text: "After the date of commencement of the QCO, no person shall manufacture, import, distribute, sell, hire, lease, store or exhibit for sale any product(s) covered under the QCO without a Standard Mark except under a valid Licence or CoC from BIS."
      },
      {
        clauseNumber: "Section 6.1",
        heading: "Applicability to Imported Products (FMCS)",
        text: "Domestic Laws / Rules / Orders / Regulations applicable to domestically produced goods shall apply, mutatis mutandis, to imports, unless specifically exempted. Foreign manufacturers must obtain a Licence or CoC under the Foreign Manufacturers Certification Scheme (FMCS)."
      },
      {
        clauseNumber: "Section 7.1",
        heading: "Statutory Penalties under Section 29(3)",
        text: "Any person who contravenes the provisions of the Order shall be punishable under the provisions of sub-section (3) of section 29 of the BIS Act, 2016 with imprisonment or with fine or with both."
      },
      {
        clauseNumber: "Section 8.1 & 11.2",
        heading: "Exemptions and BIS Enforcement Role",
        text: "Exemptions (e.g. products meant for export) come under the purview of the Line Ministry (Regulator). BIS acts as the Certification Authority and the Enforcement Authority for products under QCO."
      }
    ],
    keyHighlights: [
      "QCOs are issued under Section 16, 17, and 25 of the BIS Act 2016 by Line Ministries",
      "Prohibition covers manufacturing, importing, selling, hiring, leasing, storing, or exhibiting for sale",
      "Imports must comply mutatis mutandis under the Foreign Manufacturers Certification Scheme (FMCS)",
      "Penalties under Section 29(3) include imprisonment, heavy fines, product seizure, and cancellation of trade licences",
      "BIS is the apex Certification and Enforcement Authority across all notified sectors"
    ],
    fullTextSummary: "Official BIS Guidance Document explaining the legal architecture and enforcement mandates of Quality Control Orders."
  },
  {
    id: "doc-packaged-water-is-14543",
    fileName: "BIS_Lesson_47_Packaged_Drinking_Water_IS_14543.pdf",
    title: "Learning Science via Standards - Lesson 47: Packaged Drinking Water (IS 14543 / IS 10500)",
    standardCode: "IS 14543 / IS 10500 / IS 13428",
    scheme: "Scheme-I (ISI Mark)",
    qcoStatus: "Mandatory QCO",
    referenceNumber: "Lesson 47 / Aug 2023",
    publishDate: "August 2023",
    clauses: [
      {
        clauseNumber: "Section 1(a), (b), (c)",
        heading: "Standards for Drinking Water, Packaged Water & Natural Mineral Water",
        text: "IS 10500: Specification for Drinking water intended for human consumption. IS 14543: Specification for Packaged Drinking Water (other than Natural Mineral water). IS 13428: Specification for Natural Mineral Water obtained directly from underground water-bearing strata."
      },
      {
        clauseNumber: "Section 2(a) - (i)",
        heading: "Mandatory 9-Stage Manufacturing & Purification Process",
        text: "a) Dosing System 1 & 2 (anti-scalent water softening) -> b) Pressure Sand Filter -> c) Activated Carbon Filter (organic impurities) -> d) Micron Cartridge Filter (MCF) -> e) Demineralisation by Reverse Osmosis (RO removes 90-95% dissolved solids) -> f) Ozone Generator with Re-Circulation -> g) U.V. Disinfection System (200-280 nm germicidal UV-C) -> h) Clean Container Filling -> i) Visual Examination against illuminated screen."
      },
      {
        clauseNumber: "Section 3(a)(iv) & (d)(i)",
        heading: "TDS Limit & Container Transparency",
        text: "As per Indian Standards IS 14543, the maximum limit of Total Dissolved Solids (TDS) is 500 mg/L. For storing Packaged drinking water, the transparency of the container should not be less than 85 percent."
      },
      {
        clauseNumber: "Section 3(c)",
        heading: "Microbiological Quality Parameters",
        text: "E. coli, coliform, faecal, Sulphite reducing anaerobes must be completely ABSENT. Staphylococcus aureus, P. aeruginosa, Salmonella, Shigella, Vibrio cholera must be ABSENT. Aerobic Microbial Count shall not exceed 100/ml at 20-22°C in 72h and 20/ml at 37°C in 24h."
      },
      {
        clauseNumber: "Section 5(b) & Page 15",
        heading: "Radioactive Testing & BIS Care App Features",
        text: "Radioactive residues test is carried out before licence is granted and at regular intervals post production. BIS Care App allows consumers to verify ISI mark licences, HUID codes, CRS R-numbers, and lodge quality complaints."
      }
    ],
    keyHighlights: [
      "IS 14543 specifies Packaged Drinking Water; IS 10500 specifies Drinking Water; IS 13428 specifies Natural Mineral Water",
      "Mandatory 9-stage treatment: Dosing -> Sand Filter -> Carbon Filter -> Micron Filter -> RO (90-95% TDS removal) -> Ozone -> UV-C (200-280nm) -> Clean Filling -> Visual Screening",
      "Total Dissolved Solids (TDS) strictly capped at 500 mg/L under IS 14543",
      "Container transparency must be at least 85%",
      "Complete absence of E. coli, coliforms, Salmonella, Shigella, and Vibrio cholera",
      "BIS Care Mobile App provides one-touch verification of ISI licence and R-number"
    ],
    fullTextSummary: "BIS Educational & Technical Lesson Plan 47 on Packaged Drinking Water under IS 14543 and IS 10500."
  },
  {
    id: "doc-hallmark-green-case",
    fileName: "BIS_Case_Study_Green_Tests_for_Yellow_Metal.pdf",
    title: "BIS Hallmark – Green Tests for Yellow Metal (Case Study on Fire Assay vs XRF)",
    standardCode: "IS 1418 / IS 15820 / IS 1417",
    scheme: "Mandatory Hallmarking",
    qcoStatus: "Hallmarking Mandate",
    referenceNumber: "NITS Case Study / Sept 2021",
    publishDate: "September 2021",
    clauses: [
      {
        clauseNumber: "Background & Page 1-2",
        heading: "Mandatory Hallmarking and NGT / CPCB Pollution Advisory",
        text: "Hallmarking was made mandatory from June 23, 2021 in 256 districts. Hon'ble NGT order 18.11.2019 (OA No. 568/2019 James Jose vs Govt. of India) directed CPCB to update environmental guidelines for air pollution caused by lead fumes and nitrous fumes during fire assay cupellation/parting. AHCs categorized as 'Orange' category."
      },
      {
        clauseNumber: "Page 8-9 & Page 15-19",
        heading: "Fire Assay (IS 1418) vs XRF Statistical Paired T-Test",
        text: "On 372 gold samples, statistical paired T-test compared XRF (mean 924.26 ppt) vs Fire Assay (mean 915.90 ppt), yielding t-stat of 15.48 and p-value 4.41E-42. Concluded that XRF (surface-only ±0.1 to 0.5%) and Fire Assay (destructive referee method 0.02% accuracy) show significant statistical difference and cannot be used interchangeably for Indian handmade soldered jewellery."
      },
      {
        clauseNumber: "Page 9",
        heading: "Alternative Analytical Methods and Equipment Costs",
        text: "Alternative green methods: Atomic Absorption Spectroscopy (AAS), Inductively Coupled Plasma (ICP - equipment cost ₹50-90 Lakhs), Arc Optical Emission Spectroscopy (Arc-OES). Offsite testing centers require additional ₹30-35 Lakhs investment."
      },
      {
        clauseNumber: "Appendix 1 (Page 11-12)",
        heading: "International Hallmarking Practices (UK, France, Spain, USA)",
        text: "Vienna Convention 1972 Common Control Mark (CCM) in 21+ countries. UK (1973 Act, 4 assay offices: London, Birmingham, Sheffield, Edinburgh). France (eagle's head mark since 1838, minimum 18k, lozenge maker's mark). Spain (7 assay offices V1, M1, A1, G1, C1/C2, B2; 750/585 ppt). USA (no legal hallmarking requirement)."
      }
    ],
    keyHighlights: [
      "Mandatory hallmarking rolled out on June 23, 2021 across 256 districts",
      "NGT OA 568/2019 flagged toxic lead fumes from fire assay cupellation (IS 1418:2009)",
      "Paired T-test on 372 samples proved XRF cannot replace fire assay referee testing due to soldered handmade jewellery variations",
      "International benchmark: UK 4 assay offices, France eagle mark since 1838, USA unregulated maker marks"
    ],
    fullTextSummary: "Comprehensive BIS case study analyzing the green testing transition, NGT directives, and statistical comparative analysis of XRF vs Fire Assay."
  },
  {
    id: "doc-brief-hallmarking",
    fileName: "BIS_Brief_on_Hallmarking_Scheme.pdf",
    title: "Brief on Hallmarking Scheme for Gold & Silver Articles",
    standardCode: "IS 1417:2016 & IS 2112:2014",
    scheme: "Mandatory Hallmarking",
    qcoStatus: "Hallmarking Mandate",
    referenceNumber: "BIS HM Brief 2021",
    publishDate: "2021",
    clauses: [
      {
        clauseNumber: "Clause 2.1 & 2.2",
        heading: "Mandatory Order & Lifetime Free Jeweller Registration",
        text: "Mandatory hallmarking order issued on 23 June 2021 for 14, 18 and 22 carats (amended for 20, 23, 24K). Registration of jewellers is completely free and valid for lifetime online via automated download."
      },
      {
        clauseNumber: "Clause 2.6",
        heading: "The 3 Authentic Marks (Post 1 July 2021)",
        text: "1. BIS Triangular Logo, 2. Purity in Karat and Fineness (e.g. 22K916, 18K750, 14K585), 3. Six digit alphanumeric HUID code (e.g. AAAAAA)."
      },
      {
        clauseNumber: "Clause 2.8",
        heading: "Official Hallmarking Tariff",
        text: "Hallmarking charges for jewellery are: Rs. 35/- per piece for gold jewellery and Rs. 25/- per piece for silver jewellery irrespective of the weight of the jewellery."
      },
      {
        clauseNumber: "Clause 2.7 & 2.9",
        heading: "Silver Alloys & BIS Referral Assay Laboratories",
        text: "IS 2112:2014 specifies 6 silver grades: 990, 970, 925, 900, 835, 800. BIS referral assay laboratories located at Chennai, Sahibabad, and Kolkata conduct market surveillance testing."
      }
    ],
    keyHighlights: [
      "Jeweller registration is 100% free and valid for lifetime online",
      "3 authentic marks required: BIS Logo, Purity (22K916, etc.), and 6-digit HUID",
      "Official hallmarking fee: ₹35 per piece for gold, ₹25 per piece for silver",
      "Referral assay labs at Chennai, Sahibabad, and Kolkata verify market samples"
    ],
    fullTextSummary: "Executive briefing document detailing the regulatory framework, HUID system, and fee tariffs of the BIS Hallmarking Scheme."
  },
  {
    id: "doc-option-2-products",
    fileName: "BIS_Option_2_Simplified_Procedure_List.pdf",
    title: "Notice for Mandatory Utilisation of Option-2 (Simplified Procedure) for 30-Day Grant of Licence",
    standardCode: "Option-2 (Annexure-II(C))",
    scheme: "Scheme-I (ISI Mark)",
    qcoStatus: "Mandatory QCO",
    referenceNumber: "Annexure - II (C) Notice",
    publishDate: "2023",
    clauses: [
      {
        clauseNumber: "Page 1 Notice",
        heading: "30-Day Mandatory Option-2 Licensing for Domestic Industry & MSMEs",
        text: "Bureau of Indian Standards (B.I.S.) is introducing measures for mandatory utilisation of option - 2 (erstwhile simplified procedure) for processing product certification applications for grant of licence, introduced for the domestic Industry, including MSMEs, with the aim of processing applications within 30 days."
      },
      {
        clauseNumber: "Annexure-II(C) Table (Items 1 to 754)",
        heading: "754 Mandatory Products under Option-2",
        text: "Encloses 754+ Indian Standards including IS 15410 (Water Packaging), IS 13334 (Skimmed Milk Powder), IS 1165 (Milk Powder), IS 694 (PVC Cables), IS 12701 (Polyethylene Tanks), IS 14333 (HDPE Pipes), IS 1011 (Biscuits), IS 303 (Plywood), IS 432 (Steel Bars), IS 7098 (XLPE Cables), IS 7224 (Iodized Salt), IS 4984 (HDPE Water Pipes), IS 710 (Marine Plywood), IS 1293 (Plugs & Sockets), IS 4250 (Food Mixers), IS 1786 (TMT Bars), IS 2347 (Pressure Cookers - Item 187), IS 4151 (Helmets - Item 195), IS 10500 (Drinking Water), IS 14543 (Packaged Water)."
      }
    ],
    keyHighlights: [
      "Mandatory Option-2 simplified procedure guarantees 30-day processing for domestic applicants & MSMEs",
      "Over 754 Indian Standards are mandatorily governed by Option-2",
      "Includes IS 2347 (Pressure Cookers), IS 4151 (Two-Wheeler Helmets), IS 1786 (TMT Steel), IS 1293 (Plugs), and IS 14543 (Water)"
    ],
    fullTextSummary: "Official BIS Notice and 754-product Annexure-II(C) schedule establishing the 30-day fast-track Option-2 grant of licence."
  }
];
