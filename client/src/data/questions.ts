export type QuestionType = "Recall" | "Application" | "Scenario-Based Analysis";
export type Domain =
  | "Healthcare and Technology Environments"
  | "Clinical Informatics"
  | "Healthcare Information and Systems Management"
  | "Management and Leadership";

export interface Question {
  id: number;
  domain: Domain;
  type: QuestionType;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export const questions: Question[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // DOMAIN 1: Healthcare and Technology Environments (25 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    domain: "Healthcare and Technology Environments",
    type: "Recall",
    question: "Which federal law established the meaningful use incentive program for electronic health records?",
    options: [
      "HIPAA (Health Insurance Portability and Accountability Act)",
      "HITECH (Health Information Technology for Economic and Clinical Health Act)",
      "ACA (Affordable Care Act)",
      "MACRA (Medicare Access and CHIP Reauthorization Act)"
    ],
    answer: "HITECH (Health Information Technology for Economic and Clinical Health Act)",
    explanation: "The HITECH Act of 2009 established the Meaningful Use incentive program to encourage healthcare providers to adopt and meaningfully use certified EHR technology."
  },
  {
    id: 2,
    domain: "Healthcare and Technology Environments",
    type: "Recall",
    question: "What is the primary purpose of Health Level Seven (HL7) standards?",
    options: [
      "To encrypt patient data during transmission",
      "To define a framework for the exchange, integration, sharing, and retrieval of electronic health information",
      "To regulate billing and coding practices",
      "To standardize medical device interfaces"
    ],
    answer: "To define a framework for the exchange, integration, sharing, and retrieval of electronic health information",
    explanation: "HL7 is a set of international standards for the transfer of clinical and administrative data between software applications used by various healthcare providers."
  },
  {
    id: 3,
    domain: "Healthcare and Technology Environments",
    type: "Recall",
    question: "Which type of healthcare organization primarily provides long-term care services to elderly patients?",
    options: [
      "Acute care hospital",
      "Ambulatory surgery center",
      "Skilled nursing facility",
      "Federally qualified health center"
    ],
    answer: "Skilled nursing facility",
    explanation: "Skilled nursing facilities (SNFs) provide long-term care, including skilled nursing and rehabilitative services, primarily to elderly patients who require continuous medical supervision."
  },
  {
    id: 4,
    domain: "Healthcare and Technology Environments",
    type: "Application",
    question: "A hospital is planning to implement a Health Information Exchange (HIE). Which interoperability standard should they prioritize to ensure seamless data sharing with external providers?",
    options: [
      "DICOM",
      "HL7 FHIR",
      "ICD-10",
      "SNOMED CT"
    ],
    answer: "HL7 FHIR",
    explanation: "HL7 FHIR (Fast Healthcare Interoperability Resources) is the modern standard for health information exchange, enabling RESTful API-based data sharing across disparate systems."
  },
  {
    id: 5,
    domain: "Healthcare and Technology Environments",
    type: "Application",
    question: "A community health center wants to comply with HIPAA Security Rule requirements. Which of the following is a required administrative safeguard?",
    options: [
      "Automatic logoff",
      "Security management process",
      "Encryption of data at rest",
      "Audit controls"
    ],
    answer: "Security management process",
    explanation: "The HIPAA Security Rule requires covered entities to implement a security management process as an administrative safeguard, which includes conducting risk analyses and implementing risk management policies."
  },
  {
    id: 6,
    domain: "Healthcare and Technology Environments",
    type: "Scenario-Based Analysis",
    question: "A regional hospital network is experiencing fragmented patient records across five facilities. Patients are receiving duplicate tests because providers cannot access records from other sites. The CIO proposes implementing a Master Patient Index (MPI). What is the PRIMARY benefit of an enterprise MPI in this scenario?",
    options: [
      "It encrypts patient records to prevent unauthorized access",
      "It creates a unique identifier linking a patient's records across all facilities",
      "It automates billing processes across the network",
      "It replaces the need for individual facility EHR systems"
    ],
    answer: "It creates a unique identifier linking a patient's records across all facilities",
    explanation: "An enterprise MPI assigns a unique identifier to each patient, enabling the linkage of records across multiple facilities, thereby reducing duplicate records and improving care coordination."
  },
  {
    id: 7,
    domain: "Healthcare and Technology Environments",
    type: "Recall",
    question: "What does the acronym 'FHIR' stand for in healthcare IT?",
    options: [
      "Federal Health Information Repository",
      "Fast Healthcare Interoperability Resources",
      "Functional Health Integration Requirements",
      "Federated Health Information Records"
    ],
    answer: "Fast Healthcare Interoperability Resources",
    explanation: "FHIR stands for Fast Healthcare Interoperability Resources, a standard developed by HL7 for exchanging healthcare information electronically."
  },
  {
    id: 8,
    domain: "Healthcare and Technology Environments",
    type: "Application",
    question: "A hospital IT team is evaluating cloud infrastructure for hosting clinical applications. Which factor should be given the HIGHEST priority when assessing vendor contracts?",
    options: [
      "Cost of storage per gigabyte",
      "Business Associate Agreement (BAA) compliance with HIPAA",
      "Geographic location of data centers",
      "Availability of 24/7 customer support"
    ],
    answer: "Business Associate Agreement (BAA) compliance with HIPAA",
    explanation: "Under HIPAA, cloud service providers handling PHI must sign a Business Associate Agreement. This is the highest priority because it establishes legal accountability for data protection."
  },
  {
    id: 9,
    domain: "Healthcare and Technology Environments",
    type: "Recall",
    question: "Which accreditation body sets standards for hospital quality and patient safety in the United States?",
    options: [
      "HIMSS",
      "The Joint Commission",
      "URAC",
      "NCQA"
    ],
    answer: "The Joint Commission",
    explanation: "The Joint Commission (TJC) is the primary accreditation body for hospitals in the US, setting standards for quality care and patient safety."
  },
  {
    id: 10,
    domain: "Healthcare and Technology Environments",
    type: "Scenario-Based Analysis",
    question: "A healthcare system is transitioning from ICD-9 to ICD-10 coding. During the transition, the coding team reports a 30% increase in claim denials. The HIM director suspects the issue is inadequate physician documentation. What should be the FIRST step in addressing this problem?",
    options: [
      "Revert to ICD-9 coding temporarily",
      "Conduct a physician documentation improvement program",
      "Hire additional coding staff",
      "Submit appeals for all denied claims"
    ],
    answer: "Conduct a physician documentation improvement program",
    explanation: "ICD-10 requires more specific clinical documentation than ICD-9. A physician documentation improvement program addresses the root cause by educating physicians on the specificity required for accurate ICD-10 coding."
  },
  {
    id: 11,
    domain: "Healthcare and Technology Environments",
    type: "Recall",
    question: "What is the role of a Health Information Exchange (HIE)?",
    options: [
      "To manage hospital billing systems",
      "To enable the secure sharing of patient health information among healthcare organizations",
      "To provide telemedicine services to rural patients",
      "To store backup copies of EHR data"
    ],
    answer: "To enable the secure sharing of patient health information among healthcare organizations",
    explanation: "An HIE allows healthcare providers to access and share patient medical information electronically across organizations, improving care coordination and reducing redundancy."
  },
  {
    id: 12,
    domain: "Healthcare and Technology Environments",
    type: "Application",
    question: "A hospital is implementing telehealth services for post-discharge follow-up. Which technology infrastructure component is MOST critical to ensure service reliability?",
    options: [
      "High-resolution video cameras",
      "Redundant broadband internet connectivity",
      "Electronic prescription software",
      "Patient portal integration"
    ],
    answer: "Redundant broadband internet connectivity",
    explanation: "Telehealth services depend entirely on internet connectivity. Redundant broadband ensures that service remains available even if the primary connection fails, which is critical for patient safety."
  },
  {
    id: 13,
    domain: "Healthcare and Technology Environments",
    type: "Scenario-Based Analysis",
    question: "A small rural hospital is considering joining a larger health system's network. The IT director is concerned about maintaining local control of patient data while gaining access to shared resources. Which governance model BEST addresses this concern?",
    options: [
      "Fully centralized IT governance where the parent system controls all decisions",
      "Federated governance model allowing local autonomy within shared standards",
      "Outsourcing all IT functions to a third-party vendor",
      "Implementing a standalone EHR with no network integration"
    ],
    answer: "Federated governance model allowing local autonomy within shared standards",
    explanation: "A federated governance model balances local control with system-wide standardization, allowing the rural hospital to maintain data governance while benefiting from shared resources and interoperability."
  },
  {
    id: 14,
    domain: "Healthcare and Technology Environments",
    type: "Recall",
    question: "Which of the following best describes 'interoperability' in healthcare IT?",
    options: [
      "The ability of a system to operate without internet connectivity",
      "The ability of different information systems to exchange and use information",
      "The process of converting paper records to digital format",
      "The security protocol for protecting patient data"
    ],
    answer: "The ability of different information systems to exchange and use information",
    explanation: "Interoperability refers to the ability of different healthcare IT systems and software applications to communicate, exchange data, and use the information that has been exchanged."
  },
  {
    id: 15,
    domain: "Healthcare and Technology Environments",
    type: "Application",
    question: "A health system is evaluating its technology infrastructure to support value-based care. Which capability is MOST essential for tracking patient outcomes across the care continuum?",
    options: [
      "Real-time eligibility verification",
      "Population health management platform",
      "Automated appointment scheduling",
      "Digital imaging archiving"
    ],
    answer: "Population health management platform",
    explanation: "A population health management platform aggregates data from multiple sources to track patient outcomes, identify high-risk patients, and support care coordination across the continuum, which is essential for value-based care."
  },
  {
    id: 16,
    domain: "Healthcare and Technology Environments",
    type: "Scenario-Based Analysis",
    question: "A hospital's emergency department is experiencing significant delays because nurses must log into multiple separate systems to access patient information. The ED director asks the IT team to propose a solution. What is the MOST effective approach?",
    options: [
      "Purchase faster computers for the nursing stations",
      "Implement a single sign-on (SSO) solution integrated with a unified clinical dashboard",
      "Reduce the number of applications nurses are required to use",
      "Hire additional IT support staff for the ED"
    ],
    answer: "Implement a single sign-on (SSO) solution integrated with a unified clinical dashboard",
    explanation: "SSO combined with a unified clinical dashboard addresses the root cause by allowing nurses to authenticate once and access all required systems, significantly reducing login time and cognitive burden."
  },
  {
    id: 17,
    domain: "Healthcare and Technology Environments",
    type: "Recall",
    question: "What is the primary function of a Clinical Decision Support (CDS) system?",
    options: [
      "To automate insurance claim submissions",
      "To provide clinicians with knowledge and patient-specific information to enhance care decisions",
      "To manage hospital bed assignments",
      "To generate financial reports for administration"
    ],
    answer: "To provide clinicians with knowledge and patient-specific information to enhance care decisions",
    explanation: "CDS systems provide clinicians with relevant, patient-specific information at the point of care to support clinical decision-making, such as drug interaction alerts, diagnostic reminders, and evidence-based guidelines."
  },
  {
    id: 18,
    domain: "Healthcare and Technology Environments",
    type: "Application",
    question: "A hospital is implementing a new patient portal. To comply with the 21st Century Cures Act information blocking provisions, which requirement must be met?",
    options: [
      "Patients must pay a fee to access their records",
      "Patients must have timely access to their electronic health information without unnecessary barriers",
      "Providers must review all records before releasing them to patients",
      "Only lab results can be shared through the patient portal"
    ],
    answer: "Patients must have timely access to their electronic health information without unnecessary barriers",
    explanation: "The 21st Century Cures Act prohibits information blocking and requires that patients have timely, electronic access to their health information without unnecessary restrictions."
  },
  {
    id: 19,
    domain: "Healthcare and Technology Environments",
    type: "Recall",
    question: "Which standard is primarily used for the exchange of medical imaging data?",
    options: [
      "HL7 v2",
      "DICOM",
      "SNOMED CT",
      "LOINC"
    ],
    answer: "DICOM",
    explanation: "DICOM (Digital Imaging and Communications in Medicine) is the international standard for medical images and related information, enabling the exchange of imaging data between devices and systems."
  },
  {
    id: 20,
    domain: "Healthcare and Technology Environments",
    type: "Scenario-Based Analysis",
    question: "A multi-specialty clinic is implementing a new EHR system. During the go-live, the system experiences unexpected downtime for 4 hours. Patient care is disrupted because staff have no access to medication lists or allergies. What should have been implemented BEFORE go-live to prevent this situation?",
    options: [
      "A comprehensive downtime procedure with printed patient summaries",
      "A faster internet connection",
      "Additional EHR training for all staff",
      "A larger IT support team"
    ],
    answer: "A comprehensive downtime procedure with printed patient summaries",
    explanation: "Downtime procedures, including pre-printed patient summaries with critical information like medications and allergies, are essential contingency plans that must be established before EHR go-live to maintain patient safety during system outages."
  },
  {
    id: 21,
    domain: "Healthcare and Technology Environments",
    type: "Recall",
    question: "What does 'meaningful use' refer to in the context of EHR adoption?",
    options: [
      "Using an EHR system for administrative purposes only",
      "Using certified EHR technology in a way that improves quality, safety, and efficiency of care",
      "Ensuring all patient records are scanned into a digital system",
      "Achieving 100% physician adoption of EHR systems"
    ],
    answer: "Using certified EHR technology in a way that improves quality, safety, and efficiency of care",
    explanation: "Meaningful use refers to the use of certified EHR technology to improve quality, safety, efficiency, and reduce health disparities, while engaging patients and improving care coordination."
  },
  {
    id: 22,
    domain: "Healthcare and Technology Environments",
    type: "Application",
    question: "A healthcare organization wants to implement a BYOD (Bring Your Own Device) policy for clinical staff. Which security measure is MOST critical to implement first?",
    options: [
      "Requiring staff to purchase organization-approved devices",
      "Mobile Device Management (MDM) software with remote wipe capability",
      "Prohibiting access to clinical systems from personal devices",
      "Installing antivirus software on all personal devices"
    ],
    answer: "Mobile Device Management (MDM) software with remote wipe capability",
    explanation: "MDM software allows the organization to enforce security policies, encrypt data, and remotely wipe devices if lost or stolen, which is the most critical security measure for a BYOD environment."
  },
  {
    id: 23,
    domain: "Healthcare and Technology Environments",
    type: "Recall",
    question: "Which of the following is an example of a value-based care payment model?",
    options: [
      "Fee-for-service",
      "Accountable Care Organization (ACO)",
      "Per diem reimbursement",
      "Cost-plus contracting"
    ],
    answer: "Accountable Care Organization (ACO)",
    explanation: "ACOs are a value-based care model where groups of doctors, hospitals, and other healthcare providers coordinate to give high-quality care to Medicare patients, with financial incentives tied to quality and cost outcomes."
  },
  {
    id: 24,
    domain: "Healthcare and Technology Environments",
    type: "Application",
    question: "A hospital's IT department is asked to support a new population health initiative. Which data source would provide the MOST comprehensive view of a patient's health status across settings?",
    options: [
      "Hospital admission records only",
      "Claims data from the payer",
      "Aggregated data from EHR, claims, and social determinants of health",
      "Laboratory results from the hospital lab"
    ],
    answer: "Aggregated data from EHR, claims, and social determinants of health",
    explanation: "Comprehensive population health management requires aggregating data from multiple sources including clinical (EHR), financial (claims), and social determinants of health to provide a complete picture of patient health."
  },
  {
    id: 25,
    domain: "Healthcare and Technology Environments",
    type: "Scenario-Based Analysis",
    question: "A health system's CISO reports that a ransomware attack has encrypted critical patient data. The backup system has not been tested in 18 months. The incident response team is assembled. What is the MOST critical lesson learned from this scenario for future prevention?",
    options: [
      "Increase the IT security budget",
      "Implement regular, tested backup and disaster recovery procedures",
      "Purchase cyber insurance",
      "Hire a dedicated cybersecurity team"
    ],
    answer: "Implement regular, tested backup and disaster recovery procedures",
    explanation: "Regular testing of backup and disaster recovery procedures is essential. Untested backups may fail when needed most. This scenario highlights the critical need for a tested, documented recovery plan as part of a comprehensive business continuity strategy."
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DOMAIN 2: Clinical Informatics (20 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 26,
    domain: "Clinical Informatics",
    type: "Recall",
    question: "What does CPOE stand for in clinical informatics?",
    options: [
      "Clinical Protocol Order Entry",
      "Computerized Provider Order Entry",
      "Centralized Patient Order Exchange",
      "Certified Provider Order Evaluation"
    ],
    answer: "Computerized Provider Order Entry",
    explanation: "CPOE (Computerized Provider Order Entry) is a system that allows physicians to enter medical orders electronically, reducing medication errors and improving care efficiency."
  },
  {
    id: 27,
    domain: "Clinical Informatics",
    type: "Recall",
    question: "Which coding system is primarily used for diagnoses in the United States for billing purposes?",
    options: [
      "SNOMED CT",
      "CPT",
      "ICD-10-CM",
      "LOINC"
    ],
    answer: "ICD-10-CM",
    explanation: "ICD-10-CM (International Classification of Diseases, 10th Revision, Clinical Modification) is the standard diagnostic coding system used in the US for billing and reimbursement purposes."
  },
  {
    id: 28,
    domain: "Clinical Informatics",
    type: "Recall",
    question: "What is the primary purpose of LOINC codes in clinical informatics?",
    options: [
      "To classify surgical procedures for billing",
      "To provide universal names and codes for laboratory and clinical observations",
      "To standardize drug names and dosages",
      "To code patient diagnoses for insurance claims"
    ],
    answer: "To provide universal names and codes for laboratory and clinical observations",
    explanation: "LOINC (Logical Observation Identifiers Names and Codes) is a universal standard for identifying medical laboratory observations, enabling consistent reporting and exchange of lab results."
  },
  {
    id: 29,
    domain: "Clinical Informatics",
    type: "Application",
    question: "A clinical informatics team is analyzing medication error rates. They find that most errors occur during the transcription phase. Which intervention would MOST effectively reduce these errors?",
    options: [
      "Implementing CPOE with clinical decision support",
      "Requiring pharmacists to verify all orders",
      "Increasing nursing staff ratios",
      "Conducting monthly medication safety training"
    ],
    answer: "Implementing CPOE with clinical decision support",
    explanation: "CPOE eliminates the transcription phase entirely by allowing providers to enter orders directly into the system. Combined with CDS, it provides real-time alerts for drug interactions, allergies, and dosing errors."
  },
  {
    id: 30,
    domain: "Clinical Informatics",
    type: "Application",
    question: "A hospital wants to measure the effectiveness of a new diabetes management protocol. Which clinical metric would be MOST appropriate to track?",
    options: [
      "Number of patient visits per month",
      "Average HbA1c levels before and after protocol implementation",
      "Hospital revenue from diabetes-related admissions",
      "Number of diabetes-related prescriptions written"
    ],
    answer: "Average HbA1c levels before and after protocol implementation",
    explanation: "HbA1c is the gold standard clinical metric for measuring long-term blood glucose control in diabetic patients. Comparing pre- and post-implementation levels directly measures the protocol's clinical effectiveness."
  },
  {
    id: 31,
    domain: "Clinical Informatics",
    type: "Scenario-Based Analysis",
    question: "A hospital's clinical informatics team notices that physicians are frequently overriding drug-drug interaction alerts in the CPOE system. An analysis shows that 85% of overrides are for a specific low-severity alert that fires for a common drug combination that is clinically acceptable. What is the BEST course of action?",
    options: [
      "Disable all drug interaction alerts to reduce alert fatigue",
      "Require physician justification for every alert override",
      "Recalibrate the CDS rules to suppress the low-severity alert and retain high-severity ones",
      "Replace the CPOE system with a newer version"
    ],
    answer: "Recalibrate the CDS rules to suppress the low-severity alert and retain high-severity ones",
    explanation: "Alert fatigue is a significant patient safety concern. The appropriate response is to tune CDS rules to suppress clinically irrelevant low-severity alerts while maintaining high-severity alerts, thereby improving the signal-to-noise ratio and increasing clinician compliance with meaningful alerts."
  },
  {
    id: 32,
    domain: "Clinical Informatics",
    type: "Recall",
    question: "What is the purpose of a clinical data warehouse in a healthcare organization?",
    options: [
      "To store backup copies of EHR data",
      "To aggregate and analyze clinical data from multiple sources for reporting and research",
      "To manage real-time patient monitoring data",
      "To process insurance claims electronically"
    ],
    answer: "To aggregate and analyze clinical data from multiple sources for reporting and research",
    explanation: "A clinical data warehouse consolidates data from multiple clinical systems into a centralized repository optimized for reporting, analytics, and research purposes."
  },
  {
    id: 33,
    domain: "Clinical Informatics",
    type: "Application",
    question: "A clinical analyst is asked to create a report on 30-day hospital readmission rates. Which data elements are MOST essential for this analysis?",
    options: [
      "Patient demographics and insurance type",
      "Admission date, discharge date, discharge diagnosis, and subsequent admission within 30 days",
      "Physician specialty and nursing unit assignment",
      "Hospital revenue and cost per case"
    ],
    answer: "Admission date, discharge date, discharge diagnosis, and subsequent admission within 30 days",
    explanation: "Calculating 30-day readmission rates requires knowing when patients were discharged and whether they were readmitted within 30 days, along with the diagnosis to identify index admissions."
  },
  {
    id: 34,
    domain: "Clinical Informatics",
    type: "Scenario-Based Analysis",
    question: "A hospital's quality team discovers that sepsis mortality rates are higher than the national benchmark. The clinical informatics team is asked to help. Upon analysis, they find that sepsis screening alerts are being documented but not acted upon within the recommended timeframe. What should the informatics team recommend FIRST?",
    options: [
      "Purchase a new sepsis detection algorithm",
      "Redesign the workflow to include automated escalation when sepsis alerts are not acknowledged within a defined timeframe",
      "Increase the sensitivity of the sepsis screening tool",
      "Conduct a root cause analysis of all sepsis deaths"
    ],
    answer: "Redesign the workflow to include automated escalation when sepsis alerts are not acknowledged within a defined timeframe",
    explanation: "The problem is not detection but response. Redesigning the workflow with automated escalation ensures that unacknowledged alerts trigger a secondary notification to a supervisor or rapid response team, directly addressing the gap between detection and action."
  },
  {
    id: 35,
    domain: "Clinical Informatics",
    type: "Recall",
    question: "Which terminology standard is most commonly used for nursing diagnoses and interventions?",
    options: [
      "ICD-10",
      "SNOMED CT",
      "NANDA-I",
      "CPT"
    ],
    answer: "NANDA-I",
    explanation: "NANDA International (NANDA-I) provides standardized nursing diagnoses that are widely used in nursing practice and documentation to communicate nursing assessments and interventions."
  },
  {
    id: 36,
    domain: "Clinical Informatics",
    type: "Application",
    question: "A health system wants to implement predictive analytics to identify patients at risk for hospital-acquired infections. Which approach is MOST appropriate?",
    options: [
      "Manual review of all patient charts by infection control nurses",
      "Machine learning model trained on historical EHR data to identify risk factors",
      "Mandatory daily infection screening questionnaires for all patients",
      "Increasing the frequency of environmental cleaning"
    ],
    answer: "Machine learning model trained on historical EHR data to identify risk factors",
    explanation: "Machine learning models can analyze large volumes of historical EHR data to identify patterns and risk factors associated with hospital-acquired infections, enabling proactive intervention for high-risk patients."
  },
  {
    id: 37,
    domain: "Clinical Informatics",
    type: "Recall",
    question: "What is the primary goal of clinical documentation improvement (CDI)?",
    options: [
      "To reduce the volume of clinical documentation",
      "To ensure clinical documentation accurately reflects the patient's condition and care provided",
      "To automate the documentation process using AI",
      "To standardize documentation templates across all specialties"
    ],
    answer: "To ensure clinical documentation accurately reflects the patient's condition and care provided",
    explanation: "CDI programs aim to improve the quality and completeness of clinical documentation to ensure it accurately reflects the patient's severity of illness, which impacts coding accuracy, reimbursement, and quality metrics."
  },
  {
    id: 38,
    domain: "Clinical Informatics",
    type: "Scenario-Based Analysis",
    question: "A clinical informatics specialist reviews analytics showing that a hospital's pneumonia core measure compliance rate has dropped from 92% to 78% over six months. Investigation reveals that the EHR workflow for ordering pneumococcal vaccines was changed during a system upgrade. What is the MOST likely root cause and solution?",
    options: [
      "Physicians are not aware of the core measure requirements; solution is education",
      "The system upgrade inadvertently removed or altered the CDS reminder for pneumococcal vaccination; solution is to restore and validate the workflow",
      "Patients are refusing vaccines more frequently; solution is patient education",
      "The quality reporting module is miscalculating the metric; solution is to audit the reporting logic"
    ],
    answer: "The system upgrade inadvertently removed or altered the CDS reminder for pneumococcal vaccination; solution is to restore and validate the workflow",
    explanation: "The temporal correlation between the system upgrade and the compliance drop strongly suggests a technical root cause. Restoring the CDS reminder and validating the workflow addresses the root cause directly, rather than assuming human factors."
  },
  {
    id: 39,
    domain: "Clinical Informatics",
    type: "Recall",
    question: "What is the difference between structured and unstructured data in clinical documentation?",
    options: [
      "Structured data is stored in databases; unstructured data is stored in paper files",
      "Structured data uses predefined formats (codes, checkboxes); unstructured data is free-text narrative",
      "Structured data is created by physicians; unstructured data is created by nurses",
      "Structured data is encrypted; unstructured data is not"
    ],
    answer: "Structured data uses predefined formats (codes, checkboxes); unstructured data is free-text narrative",
    explanation: "Structured data (e.g., coded diagnoses, vital signs, lab values) is stored in predefined fields and is easily searchable. Unstructured data (e.g., physician notes, discharge summaries) is free-text and requires natural language processing to analyze."
  },
  {
    id: 40,
    domain: "Clinical Informatics",
    type: "Application",
    question: "A hospital wants to implement a medication reconciliation process to reduce adverse drug events at transitions of care. Which technology would BEST support this process?",
    options: [
      "A barcode medication administration system",
      "An automated medication reconciliation module integrated with the EHR",
      "A pharmacy dispensing robot",
      "An electronic prescribing system"
    ],
    answer: "An automated medication reconciliation module integrated with the EHR",
    explanation: "An automated medication reconciliation module integrated with the EHR can compare medication lists across care settings, flag discrepancies, and prompt clinicians to review and reconcile medications at transitions of care."
  },
  {
    id: 41,
    domain: "Clinical Informatics",
    type: "Scenario-Based Analysis",
    question: "A hospital's clinical informatics team is asked to evaluate the impact of a new fall prevention protocol. They have 12 months of pre-implementation data and 6 months of post-implementation data. The fall rate decreased from 3.2 falls per 1,000 patient days to 2.1 falls per 1,000 patient days. However, the team notices that the post-implementation period coincides with lower patient census due to COVID-19. What is the MOST significant threat to the validity of this analysis?",
    options: [
      "The measurement period is too short",
      "Confounding variable: lower census may have independently reduced falls regardless of the protocol",
      "The fall rate metric is not appropriate for this analysis",
      "The data was not collected by the informatics team directly"
    ],
    answer: "Confounding variable: lower census may have independently reduced falls regardless of the protocol",
    explanation: "A confounding variable is a factor that correlates with both the intervention and the outcome. Lower patient census reduces the absolute number of at-risk patients, which could independently reduce fall rates, making it impossible to attribute the improvement solely to the protocol."
  },
  {
    id: 42,
    domain: "Clinical Informatics",
    type: "Recall",
    question: "What is the primary purpose of Natural Language Processing (NLP) in clinical informatics?",
    options: [
      "To translate medical documents into multiple languages",
      "To extract structured information from unstructured clinical text",
      "To generate automated clinical notes",
      "To encrypt sensitive patient information"
    ],
    answer: "To extract structured information from unstructured clinical text",
    explanation: "NLP enables computers to understand and process human language, allowing extraction of structured data (e.g., diagnoses, symptoms, medications) from unstructured clinical text such as physician notes and discharge summaries."
  },
  {
    id: 43,
    domain: "Clinical Informatics",
    type: "Application",
    question: "A clinical informatics team is designing a dashboard for ICU nurses to monitor patient deterioration. Which principle should guide the design of alert thresholds?",
    options: [
      "Set thresholds as sensitive as possible to catch all potential deterioration events",
      "Balance sensitivity and specificity to minimize alert fatigue while maintaining patient safety",
      "Use the same thresholds as the general medical ward",
      "Allow each nurse to set their own personal alert thresholds"
    ],
    answer: "Balance sensitivity and specificity to minimize alert fatigue while maintaining patient safety",
    explanation: "Alert thresholds must balance sensitivity (catching true deterioration) with specificity (avoiding false alarms). Too many false alarms cause alert fatigue, leading clinicians to ignore alerts, which paradoxically reduces patient safety."
  },
  {
    id: 44,
    domain: "Clinical Informatics",
    type: "Recall",
    question: "Which of the following best describes the concept of 'data governance' in a healthcare organization?",
    options: [
      "The IT department's control over all computer systems",
      "A framework for managing data availability, usability, integrity, and security",
      "The process of backing up clinical data",
      "The legal requirements for data retention"
    ],
    answer: "A framework for managing data availability, usability, integrity, and security",
    explanation: "Data governance is a comprehensive framework that defines policies, procedures, and responsibilities for managing data quality, security, privacy, and appropriate use across the organization."
  },
  {
    id: 45,
    domain: "Clinical Informatics",
    type: "Scenario-Based Analysis",
    question: "A health system is implementing an AI-based diagnostic tool that predicts the likelihood of acute kidney injury (AKI) in hospitalized patients. During validation, the team discovers the model performs significantly worse for Black patients compared to White patients. What is the MOST appropriate response?",
    options: [
      "Deploy the model for all patients since overall performance is acceptable",
      "Delay deployment and investigate the source of bias, retraining the model with representative data",
      "Deploy the model only for White patients",
      "Reduce the prediction threshold for Black patients to compensate"
    ],
    answer: "Delay deployment and investigate the source of bias, retraining the model with representative data",
    explanation: "Deploying a biased AI model would perpetuate health disparities and could cause harm to underrepresented populations. The ethical and clinically responsible approach is to investigate the source of bias (e.g., underrepresentation in training data) and retrain the model with more representative data before deployment."
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DOMAIN 3: Healthcare Information and Systems Management (30 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 46,
    domain: "Healthcare Information and Systems Management",
    type: "Recall",
    question: "Which project management methodology uses iterative development cycles called 'sprints'?",
    options: [
      "Waterfall",
      "PRINCE2",
      "Agile/Scrum",
      "Six Sigma"
    ],
    answer: "Agile/Scrum",
    explanation: "Agile/Scrum methodology uses short, iterative development cycles called sprints (typically 2-4 weeks) to deliver working software incrementally, allowing for frequent feedback and adaptation."
  },
  {
    id: 47,
    domain: "Healthcare Information and Systems Management",
    type: "Recall",
    question: "What is the primary purpose of a System Development Life Cycle (SDLC)?",
    options: [
      "To manage the financial aspects of IT projects",
      "To provide a structured process for planning, creating, testing, and deploying information systems",
      "To document user requirements for new systems",
      "To train end users on new software applications"
    ],
    answer: "To provide a structured process for planning, creating, testing, and deploying information systems",
    explanation: "The SDLC is a systematic process used to plan, create, test, and deploy information systems, ensuring that systems are developed in a structured, controlled manner."
  },
  {
    id: 48,
    domain: "Healthcare Information and Systems Management",
    type: "Application",
    question: "A hospital is selecting a new laboratory information system (LIS). Which approach to vendor selection is MOST comprehensive?",
    options: [
      "Selecting the vendor with the lowest price",
      "Issuing a Request for Proposal (RFP) and evaluating vendors against defined criteria",
      "Selecting the system used by the largest number of hospitals",
      "Choosing the vendor recommended by the CMO"
    ],
    answer: "Issuing a Request for Proposal (RFP) and evaluating vendors against defined criteria",
    explanation: "An RFP process ensures a structured, objective evaluation of vendors against predefined criteria that align with organizational needs, enabling an informed selection decision."
  },
  {
    id: 49,
    domain: "Healthcare Information and Systems Management",
    type: "Application",
    question: "During EHR implementation, end users report that the system is too slow during peak hours. The IT team identifies that the database server is the bottleneck. What type of testing should have identified this issue before go-live?",
    options: [
      "Unit testing",
      "User acceptance testing",
      "Performance/load testing",
      "Integration testing"
    ],
    answer: "Performance/load testing",
    explanation: "Performance/load testing simulates peak usage conditions to identify system bottlenecks and ensure the system can handle expected user volumes, which would have identified the database server as a bottleneck before go-live."
  },
  {
    id: 50,
    domain: "Healthcare Information and Systems Management",
    type: "Scenario-Based Analysis",
    question: "A hospital is 6 months into a 12-month EHR implementation project. The project is 20% over budget and 6 weeks behind schedule. The project sponsor asks the project manager for options. What is the BEST approach to get the project back on track?",
    options: [
      "Extend the project timeline and increase the budget",
      "Conduct a scope review to identify non-critical features that can be deferred to a later phase",
      "Replace the project manager",
      "Reduce the number of training sessions to save time and money"
    ],
    answer: "Conduct a scope review to identify non-critical features that can be deferred to a later phase",
    explanation: "Scope management (reducing scope by deferring non-critical features) is the most effective way to recover a project that is over budget and behind schedule without compromising the core deliverable. This is a classic application of the project management triple constraint."
  },
  {
    id: 51,
    domain: "Healthcare Information and Systems Management",
    type: "Recall",
    question: "What is the purpose of a 'gap analysis' in healthcare IT system selection?",
    options: [
      "To identify the financial gap between the current and proposed system costs",
      "To compare current system capabilities against desired future state requirements",
      "To analyze the gap in staff knowledge about the new system",
      "To measure the time gap between system implementation phases"
    ],
    answer: "To compare current system capabilities against desired future state requirements",
    explanation: "A gap analysis compares the current state (existing system capabilities) to the desired future state (requirements), identifying gaps that need to be addressed through the new system or process changes."
  },
  {
    id: 52,
    domain: "Healthcare Information and Systems Management",
    type: "Application",
    question: "A hospital's IT team is conducting a risk assessment for a new patient scheduling system. Which framework is MOST appropriate for this assessment?",
    options: [
      "SWOT analysis",
      "NIST Cybersecurity Framework",
      "Balanced Scorecard",
      "LEAN methodology"
    ],
    answer: "NIST Cybersecurity Framework",
    explanation: "The NIST Cybersecurity Framework provides a comprehensive structure for identifying, protecting, detecting, responding to, and recovering from cybersecurity risks, making it the most appropriate framework for IT risk assessment."
  },
  {
    id: 53,
    domain: "Healthcare Information and Systems Management",
    type: "Scenario-Based Analysis",
    question: "A hospital is implementing a new EHR system using a 'big bang' approach, where all departments go live simultaneously. Two weeks before go-live, the IT team discovers that the interface between the EHR and the pharmacy system is not functioning correctly. What is the MOST appropriate action?",
    options: [
      "Proceed with go-live and fix the interface post-implementation",
      "Delay the go-live until the interface is tested and validated",
      "Implement the EHR without the pharmacy interface and add it later",
      "Switch to a phased implementation approach"
    ],
    answer: "Delay the go-live until the interface is tested and validated",
    explanation: "A non-functional pharmacy interface poses a direct patient safety risk (medication errors). Delaying go-live to resolve this critical issue is the only responsible option, as patient safety must take precedence over project timelines."
  },
  {
    id: 54,
    domain: "Healthcare Information and Systems Management",
    type: "Recall",
    question: "What is the primary purpose of a Business Continuity Plan (BCP) in healthcare IT?",
    options: [
      "To plan for system upgrades and new technology adoption",
      "To ensure critical business functions continue during and after a disaster",
      "To document IT policies and procedures",
      "To manage vendor relationships and contracts"
    ],
    answer: "To ensure critical business functions continue during and after a disaster",
    explanation: "A BCP ensures that critical healthcare operations can continue during and after a disruptive event (e.g., natural disaster, cyberattack, system failure) by defining recovery strategies and procedures."
  },
  {
    id: 55,
    domain: "Healthcare Information and Systems Management",
    type: "Application",
    question: "A hospital is designing its EHR training program for go-live. Which training approach has been shown to be MOST effective for clinical staff?",
    options: [
      "Classroom-based lectures with PowerPoint presentations",
      "Role-based, hands-on training in a simulated environment that mirrors the live system",
      "Self-paced online modules completed at home",
      "Peer-to-peer training where experienced users train colleagues"
    ],
    answer: "Role-based, hands-on training in a simulated environment that mirrors the live system",
    explanation: "Role-based, hands-on training in a simulated environment is most effective because it allows staff to practice workflows specific to their role in a safe environment before going live, building muscle memory and confidence."
  },
  {
    id: 56,
    domain: "Healthcare Information and Systems Management",
    type: "Recall",
    question: "What is the difference between 'data integrity' and 'data security' in healthcare information management?",
    options: [
      "Data integrity refers to accuracy and consistency of data; data security refers to protection from unauthorized access",
      "Data integrity is about backup procedures; data security is about encryption",
      "Data integrity is a legal requirement; data security is a technical requirement",
      "They are synonymous terms used interchangeably"
    ],
    answer: "Data integrity refers to accuracy and consistency of data; data security refers to protection from unauthorized access",
    explanation: "Data integrity ensures that data is accurate, complete, and consistent throughout its lifecycle. Data security focuses on protecting data from unauthorized access, use, disclosure, or destruction."
  },
  {
    id: 57,
    domain: "Healthcare Information and Systems Management",
    type: "Scenario-Based Analysis",
    question: "A hospital's IT team is conducting post-implementation review of a new EHR system 90 days after go-live. Physician satisfaction scores are low (3.2/10), and the average time to complete a patient note has increased from 8 minutes to 14 minutes. What is the MOST likely root cause and recommended action?",
    options: [
      "The EHR system is technically deficient; recommend replacing it",
      "Workflow redesign was inadequate; conduct workflow optimization sessions with physicians to customize templates and order sets",
      "Physicians need more training; schedule additional training sessions",
      "The implementation was too fast; extend the go-live period"
    ],
    answer: "Workflow redesign was inadequate; conduct workflow optimization sessions with physicians to customize templates and order sets",
    explanation: "Increased documentation time and low satisfaction typically indicate that the EHR was not optimized for clinical workflows. Workflow optimization sessions that customize templates, order sets, and documentation shortcuts to match physician preferences are the most effective intervention."
  },
  {
    id: 58,
    domain: "Healthcare Information and Systems Management",
    type: "Recall",
    question: "What is the purpose of interface testing in healthcare IT system implementation?",
    options: [
      "To test the user interface for ease of use",
      "To verify that data is accurately transmitted between integrated systems",
      "To test system performance under load",
      "To validate that security controls are functioning correctly"
    ],
    answer: "To verify that data is accurately transmitted between integrated systems",
    explanation: "Interface testing verifies that data is correctly transmitted, transformed, and received between integrated systems (e.g., EHR to lab system), ensuring data integrity across system boundaries."
  },
  {
    id: 59,
    domain: "Healthcare Information and Systems Management",
    type: "Application",
    question: "A hospital is implementing role-based access control (RBAC) for its EHR system. Which principle should guide the assignment of access rights?",
    options: [
      "All clinical staff should have access to all patient records",
      "Least privilege: users should have only the minimum access necessary to perform their job functions",
      "Access should be determined by seniority and years of experience",
      "Department heads should have access to all records in their department"
    ],
    answer: "Least privilege: users should have only the minimum access necessary to perform their job functions",
    explanation: "The principle of least privilege is a fundamental security concept that minimizes the risk of unauthorized access or data breaches by ensuring users can only access the information necessary for their specific job functions."
  },
  {
    id: 60,
    domain: "Healthcare Information and Systems Management",
    type: "Scenario-Based Analysis",
    question: "A hospital is evaluating whether to build a custom EHR module or buy a commercial solution. The custom build would cost $2M and take 18 months; the commercial solution costs $800K and can be deployed in 6 months. The custom build would perfectly match current workflows; the commercial solution requires workflow changes. What framework should guide this decision?",
    options: [
      "Always choose the custom build to ensure perfect workflow fit",
      "Always choose the commercial solution to minimize cost",
      "Conduct a total cost of ownership (TCO) analysis including maintenance, support, and opportunity costs over 5 years",
      "Choose based on the preference of the CMO"
    ],
    answer: "Conduct a total cost of ownership (TCO) analysis including maintenance, support, and opportunity costs over 5 years",
    explanation: "A TCO analysis provides a comprehensive view of all costs over the system's lifecycle, including initial purchase, implementation, training, maintenance, support, and opportunity costs. This enables an objective, data-driven build vs. buy decision."
  },
  {
    id: 61,
    domain: "Healthcare Information and Systems Management",
    type: "Recall",
    question: "What is the purpose of a 'cutover plan' in EHR implementation?",
    options: [
      "To plan the decommissioning of the old system after go-live",
      "To detail the specific steps and timeline for transitioning from the old system to the new system",
      "To document the training schedule for end users",
      "To outline the vendor support agreement post-implementation"
    ],
    answer: "To detail the specific steps and timeline for transitioning from the old system to the new system",
    explanation: "A cutover plan documents the specific steps, timeline, responsibilities, and contingencies for transitioning from the legacy system to the new system, ensuring a controlled and coordinated go-live."
  },
  {
    id: 62,
    domain: "Healthcare Information and Systems Management",
    type: "Application",
    question: "A hospital's IT team is asked to implement data encryption for laptops used by clinical staff. Which type of encryption should be implemented?",
    options: [
      "File-level encryption for specific sensitive files",
      "Full-disk encryption (FDE) for all laptops",
      "Email encryption only",
      "Database encryption for the EHR server"
    ],
    answer: "Full-disk encryption (FDE) for all laptops",
    explanation: "Full-disk encryption protects all data on a laptop if it is lost or stolen, regardless of which files contain PHI. This is the most comprehensive protection for mobile devices and is required by HIPAA for portable devices containing PHI."
  },
  {
    id: 63,
    domain: "Healthcare Information and Systems Management",
    type: "Scenario-Based Analysis",
    question: "A hospital's IT department receives a request from the research department to access the EHR database directly for a clinical study. The research team wants a direct database connection to run ad-hoc queries. What is the MOST appropriate response from the IT team?",
    options: [
      "Grant direct database access with a read-only account",
      "Deny the request entirely as it violates HIPAA",
      "Provide de-identified data extracts through a formal data governance process with IRB approval",
      "Allow access only during off-peak hours to minimize system impact"
    ],
    answer: "Provide de-identified data extracts through a formal data governance process with IRB approval",
    explanation: "Direct database access poses risks to data integrity, system performance, and patient privacy. The appropriate process is to provide de-identified data extracts through a formal data governance process that includes IRB approval, data use agreements, and appropriate de-identification to protect patient privacy."
  },
  {
    id: 64,
    domain: "Healthcare Information and Systems Management",
    type: "Recall",
    question: "What is the primary purpose of a 'sandbox environment' in healthcare IT?",
    options: [
      "A secure environment for storing sensitive patient data",
      "An isolated testing environment that mirrors production for safe testing without affecting live systems",
      "A training environment for new employees",
      "A backup environment for disaster recovery"
    ],
    answer: "An isolated testing environment that mirrors production for safe testing without affecting live systems",
    explanation: "A sandbox environment is an isolated replica of the production environment used for testing system changes, upgrades, and new configurations without any risk to live patient data or system stability."
  },
  {
    id: 65,
    domain: "Healthcare Information and Systems Management",
    type: "Application",
    question: "A hospital is planning a major EHR upgrade. Which stakeholders should be included in the project governance committee?",
    options: [
      "IT staff only, as this is a technical project",
      "Clinical leadership, IT leadership, finance, compliance, and end-user representatives",
      "The EHR vendor's project team",
      "Hospital administration and the board of directors only"
    ],
    answer: "Clinical leadership, IT leadership, finance, compliance, and end-user representatives",
    explanation: "EHR upgrades impact clinical workflows, finances, compliance, and all end users. Effective governance requires representation from all affected stakeholders to ensure decisions reflect organizational needs and gain broad buy-in."
  },
  {
    id: 66,
    domain: "Healthcare Information and Systems Management",
    type: "Recall",
    question: "What does 'change management' refer to in the context of healthcare IT implementation?",
    options: [
      "Managing changes to the IT budget",
      "The structured approach to transitioning individuals and organizations from a current state to a desired future state",
      "The process of updating software to newer versions",
      "Managing changes to vendor contracts"
    ],
    answer: "The structured approach to transitioning individuals and organizations from a current state to a desired future state",
    explanation: "Change management in healthcare IT refers to the organizational and people-focused processes that help staff adapt to new systems and workflows, addressing resistance and building adoption."
  },
  {
    id: 67,
    domain: "Healthcare Information and Systems Management",
    type: "Scenario-Based Analysis",
    question: "A hospital's IT team is asked to evaluate a vendor's proposal for a new radiology information system (RIS). The vendor claims 99.9% uptime. The hospital's radiology department operates 24/7. What questions should the IT team ask to validate this claim?",
    options: [
      "Ask for the vendor's marketing materials and customer testimonials",
      "Request SLA documentation, reference sites with similar 24/7 operations, and historical uptime data with planned maintenance windows excluded",
      "Accept the claim at face value as it is standard industry practice",
      "Ask only about the cost of downtime penalties in the contract"
    ],
    answer: "Request SLA documentation, reference sites with similar 24/7 operations, and historical uptime data with planned maintenance windows excluded",
    explanation: "Validating uptime claims requires reviewing the Service Level Agreement (SLA) for specific definitions, speaking with reference sites with comparable 24/7 operations, and examining historical uptime data. Planned maintenance windows are often excluded from uptime calculations, which is a critical distinction for 24/7 operations."
  },
  {
    id: 68,
    domain: "Healthcare Information and Systems Management",
    type: "Recall",
    question: "What is the purpose of a 'data dictionary' in healthcare information management?",
    options: [
      "A glossary of medical terms for patient education",
      "A centralized repository that defines the meaning, format, and relationships of data elements in a system",
      "A list of approved abbreviations for clinical documentation",
      "A reference guide for ICD-10 coding"
    ],
    answer: "A centralized repository that defines the meaning, format, and relationships of data elements in a system",
    explanation: "A data dictionary defines the structure, meaning, format, and relationships of all data elements in an information system, ensuring consistent understanding and use of data across the organization."
  },
  {
    id: 69,
    domain: "Healthcare Information and Systems Management",
    type: "Application",
    question: "A hospital's privacy officer discovers that a nurse accessed the EHR records of a celebrity patient without a treatment relationship. Which HIPAA provision was violated?",
    options: [
      "HIPAA Privacy Rule - minimum necessary standard",
      "HIPAA Security Rule - access control",
      "HIPAA Breach Notification Rule",
      "HIPAA Transaction and Code Sets Rule"
    ],
    answer: "HIPAA Privacy Rule - minimum necessary standard",
    explanation: "The HIPAA Privacy Rule's minimum necessary standard requires that access to PHI be limited to only what is necessary for the individual's job function. Accessing records without a treatment relationship violates this standard."
  },
  {
    id: 70,
    domain: "Healthcare Information and Systems Management",
    type: "Scenario-Based Analysis",
    question: "A hospital is implementing a new patient flow management system. During user acceptance testing, nurses report that the system requires 12 clicks to complete a task that previously required 4 clicks in the old system. The vendor says this is by design. What is the MOST appropriate next step?",
    options: [
      "Accept the design as the vendor is the expert",
      "Reject the system and select a different vendor",
      "Document the workflow inefficiency as a formal issue and require the vendor to redesign the workflow before go-live",
      "Proceed with go-live and retrain nurses to adapt to the new workflow"
    ],
    answer: "Document the workflow inefficiency as a formal issue and require the vendor to redesign the workflow before go-live",
    explanation: "A 3x increase in clicks represents a significant workflow regression that will reduce efficiency and increase the risk of workarounds. This should be formally documented as an issue requiring resolution before go-live, as post-implementation workflow changes are more costly and disruptive."
  },
  {
    id: 71,
    domain: "Healthcare Information and Systems Management",
    type: "Recall",
    question: "What is the primary purpose of a 'Service Level Agreement (SLA)' in healthcare IT vendor contracts?",
    options: [
      "To define the scope of services and performance standards the vendor must meet",
      "To establish the payment schedule for IT services",
      "To outline the training requirements for IT staff",
      "To document the vendor's security certifications"
    ],
    answer: "To define the scope of services and performance standards the vendor must meet",
    explanation: "An SLA is a contractual agreement that defines the expected level of service, including uptime guarantees, response times, and performance metrics, along with remedies if the vendor fails to meet these standards."
  },
  {
    id: 72,
    domain: "Healthcare Information and Systems Management",
    type: "Application",
    question: "A hospital is conducting a post-implementation evaluation of a new EHR system. Which metric would BEST measure the system's impact on clinical efficiency?",
    options: [
      "Number of system logins per day",
      "Average time to complete a patient encounter from check-in to checkout",
      "Total number of EHR licenses purchased",
      "Vendor response time to support tickets"
    ],
    answer: "Average time to complete a patient encounter from check-in to checkout",
    explanation: "Average encounter time directly measures clinical workflow efficiency. A reduction in encounter time indicates that the EHR is improving clinical efficiency, while an increase suggests workflow problems."
  },
  {
    id: 73,
    domain: "Healthcare Information and Systems Management",
    type: "Recall",
    question: "Which type of data migration approach transfers all data from the legacy system to the new system at once?",
    options: [
      "Phased migration",
      "Parallel migration",
      "Big bang migration",
      "Incremental migration"
    ],
    answer: "Big bang migration",
    explanation: "Big bang migration transfers all data from the legacy system to the new system in a single cutover event. While risky, it eliminates the need to maintain two systems simultaneously."
  },
  {
    id: 74,
    domain: "Healthcare Information and Systems Management",
    type: "Scenario-Based Analysis",
    question: "A hospital's IT security team detects unusual network traffic suggesting a potential data breach. The CISO activates the incident response plan. What is the CORRECT order of the first three steps in the incident response process?",
    options: [
      "Contain, Identify, Notify",
      "Identify, Contain, Eradicate",
      "Notify, Contain, Recover",
      "Eradicate, Recover, Notify"
    ],
    answer: "Identify, Contain, Eradicate",
    explanation: "The NIST incident response framework follows: Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned. After identifying the incident, the priority is to contain it to prevent further damage, then eradicate the threat before recovery."
  },
  {
    id: 75,
    domain: "Healthcare Information and Systems Management",
    type: "Recall",
    question: "What is the purpose of a 'Disaster Recovery Plan (DRP)' in healthcare IT?",
    options: [
      "To prevent disasters from occurring",
      "To restore IT systems and data after a disruptive event",
      "To train staff on emergency procedures",
      "To document the insurance coverage for IT assets"
    ],
    answer: "To restore IT systems and data after a disruptive event",
    explanation: "A DRP provides documented procedures for restoring IT systems, applications, and data following a disruptive event, with defined Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO)."
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DOMAIN 4: Management and Leadership (25 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 76,
    domain: "Management and Leadership",
    type: "Recall",
    question: "What is the primary purpose of a 'balanced scorecard' in healthcare IT management?",
    options: [
      "To balance the IT budget across departments",
      "To measure organizational performance across multiple perspectives: financial, customer, internal processes, and learning",
      "To evaluate individual employee performance",
      "To compare the organization's performance against industry benchmarks"
    ],
    answer: "To measure organizational performance across multiple perspectives: financial, customer, internal processes, and learning",
    explanation: "The Balanced Scorecard is a strategic management tool that measures performance across four perspectives: financial, customer, internal business processes, and learning and growth, providing a comprehensive view of organizational performance."
  },
  {
    id: 77,
    domain: "Management and Leadership",
    type: "Recall",
    question: "Which leadership style is MOST effective when implementing a major EHR system change that requires significant organizational transformation?",
    options: [
      "Autocratic leadership",
      "Laissez-faire leadership",
      "Transformational leadership",
      "Transactional leadership"
    ],
    answer: "Transformational leadership",
    explanation: "Transformational leadership inspires and motivates staff to embrace change by articulating a compelling vision, building trust, and empowering individuals to contribute to the transformation, which is most effective for large-scale organizational change."
  },
  {
    id: 78,
    domain: "Management and Leadership",
    type: "Application",
    question: "A CIO is developing the IT strategic plan for the next 3 years. Which process should be used to ensure the IT strategy aligns with organizational goals?",
    options: [
      "Conduct an IT-only planning session",
      "Align IT strategic objectives with the organization's overall strategic plan through collaborative planning with executive leadership",
      "Survey IT staff about their technology preferences",
      "Review competitor organizations' IT strategies"
    ],
    answer: "Align IT strategic objectives with the organization's overall strategic plan through collaborative planning with executive leadership",
    explanation: "IT strategy must be directly aligned with and supportive of the organization's overall strategic goals. This requires collaborative planning with executive leadership to ensure IT investments support organizational priorities."
  },
  {
    id: 79,
    domain: "Management and Leadership",
    type: "Application",
    question: "A hospital's IT director is preparing a business case for a $5M EHR upgrade. Which financial analysis should be included to demonstrate return on investment?",
    options: [
      "A list of features in the new system",
      "Net Present Value (NPV) analysis comparing projected benefits to costs over 5 years",
      "A comparison of the vendor's pricing to competitors",
      "The number of hospitals using the same system"
    ],
    answer: "Net Present Value (NPV) analysis comparing projected benefits to costs over 5 years",
    explanation: "NPV analysis calculates the present value of projected benefits minus costs over the investment period, accounting for the time value of money. This is the standard financial tool for evaluating large capital investments and demonstrating ROI to executive leadership."
  },
  {
    id: 80,
    domain: "Management and Leadership",
    type: "Scenario-Based Analysis",
    question: "A CIO presents a proposal for a $3M cybersecurity upgrade to the hospital board. The board is skeptical about the ROI. The CIO must justify the investment. What is the MOST compelling argument?",
    options: [
      "Other hospitals have made similar investments",
      "Quantify the potential financial impact of a data breach (fines, remediation, reputational damage) and compare it to the cost of prevention",
      "Cite regulatory requirements for cybersecurity",
      "Present the technical specifications of the proposed security tools"
    ],
    answer: "Quantify the potential financial impact of a data breach (fines, remediation, reputational damage) and compare it to the cost of prevention",
    explanation: "Boards respond to financial risk quantification. Presenting the potential cost of a breach (average healthcare breach costs $10M+) versus the $3M prevention investment demonstrates a clear risk-adjusted ROI that resonates with board-level decision makers."
  },
  {
    id: 81,
    domain: "Management and Leadership",
    type: "Recall",
    question: "What is the primary purpose of a 'SWOT analysis' in healthcare IT strategic planning?",
    options: [
      "To evaluate software vendor options",
      "To assess internal strengths and weaknesses and external opportunities and threats",
      "To measure staff performance",
      "To analyze network security vulnerabilities"
    ],
    answer: "To assess internal strengths and weaknesses and external opportunities and threats",
    explanation: "SWOT analysis evaluates internal factors (Strengths and Weaknesses) and external factors (Opportunities and Threats) to inform strategic planning and decision-making."
  },
  {
    id: 82,
    domain: "Management and Leadership",
    type: "Application",
    question: "An IT director is managing a team of 15 IT professionals with varying skill levels. Two senior engineers are consistently performing above expectations, while three junior staff members are struggling. What management approach would BEST address this situation?",
    options: [
      "Treat all staff equally with the same management approach",
      "Apply situational leadership: provide coaching and direction to junior staff while delegating autonomy to senior staff",
      "Focus management attention exclusively on the underperforming staff",
      "Reassign the struggling staff to different roles"
    ],
    answer: "Apply situational leadership: provide coaching and direction to junior staff while delegating autonomy to senior staff",
    explanation: "Situational leadership theory prescribes adapting leadership style to the development level of each individual. Junior staff need coaching and direction (high task, high relationship), while senior performers need delegation (low task, low relationship)."
  },
  {
    id: 83,
    domain: "Management and Leadership",
    type: "Recall",
    question: "What does 'IT governance' refer to in a healthcare organization?",
    options: [
      "The IT department's internal management structure",
      "The framework of policies, processes, and structures that ensure IT investments align with organizational goals and manage IT risks",
      "The regulatory compliance requirements for healthcare IT",
      "The vendor management process for IT contracts"
    ],
    answer: "The framework of policies, processes, and structures that ensure IT investments align with organizational goals and manage IT risks",
    explanation: "IT governance is a comprehensive framework that ensures IT investments, decisions, and activities are aligned with organizational strategy, deliver value, manage risks, and optimize resources."
  },
  {
    id: 84,
    domain: "Management and Leadership",
    type: "Scenario-Based Analysis",
    question: "A hospital's IT department has a $10M annual budget. The CIO receives requests totaling $18M from various departments. How should the CIO prioritize these requests?",
    options: [
      "Fund requests on a first-come, first-served basis",
      "Establish an IT governance committee to evaluate requests against strategic priorities, regulatory requirements, and ROI",
      "Divide the budget equally among all departments",
      "Fund only the requests from the highest-revenue departments"
    ],
    answer: "Establish an IT governance committee to evaluate requests against strategic priorities, regulatory requirements, and ROI",
    explanation: "An IT governance committee provides a structured, transparent process for prioritizing IT investments based on strategic alignment, regulatory requirements, patient safety impact, and financial return, ensuring limited resources are allocated to highest-value initiatives."
  },
  {
    id: 85,
    domain: "Management and Leadership",
    type: "Application",
    question: "A hospital's IT director wants to benchmark the IT department's performance. Which approach provides the MOST meaningful comparison?",
    options: [
      "Compare against the previous year's internal metrics only",
      "Compare against industry benchmarks from peer organizations of similar size and complexity",
      "Compare against the best-performing hospital in the country",
      "Compare against the IT vendor's performance guarantees"
    ],
    answer: "Compare against industry benchmarks from peer organizations of similar size and complexity",
    explanation: "Benchmarking against peer organizations of similar size and complexity provides the most meaningful comparison, as it accounts for differences in scale, resources, and operational context that would make comparisons to dissimilar organizations misleading."
  },
  {
    id: 86,
    domain: "Management and Leadership",
    type: "Recall",
    question: "What is the purpose of a 'competency model' in healthcare IT workforce management?",
    options: [
      "To rank employees by their technical skills",
      "To define the knowledge, skills, and behaviors required for success in specific IT roles",
      "To determine salary ranges for IT positions",
      "To identify candidates for promotion"
    ],
    answer: "To define the knowledge, skills, and behaviors required for success in specific IT roles",
    explanation: "A competency model defines the specific knowledge, skills, abilities, and behaviors required for success in each IT role, providing a foundation for hiring, performance management, and professional development."
  },
  {
    id: 87,
    domain: "Management and Leadership",
    type: "Scenario-Based Analysis",
    question: "A hospital's IT department is experiencing high staff turnover (35% annually). Exit interviews reveal that staff feel undervalued and see limited career growth opportunities. The IT director must develop a retention strategy. What is the MOST effective approach?",
    options: [
      "Increase salaries across the board",
      "Implement a comprehensive retention strategy including career development pathways, mentoring, recognition programs, and competitive compensation",
      "Offer signing bonuses to new hires to replace departing staff",
      "Outsource IT functions to reduce dependence on internal staff"
    ],
    answer: "Implement a comprehensive retention strategy including career development pathways, mentoring, recognition programs, and competitive compensation",
    explanation: "High turnover driven by feeling undervalued and lack of growth requires a multi-faceted retention strategy. Research shows that career development and recognition are often more powerful retention drivers than compensation alone. A comprehensive approach addresses all identified root causes."
  },
  {
    id: 88,
    domain: "Management and Leadership",
    type: "Application",
    question: "A CIO is preparing to present the IT department's annual performance report to the hospital board. Which presentation approach would be MOST effective?",
    options: [
      "Present detailed technical metrics and system uptime statistics",
      "Translate IT performance metrics into business outcomes that resonate with board members (patient safety, financial impact, regulatory compliance)",
      "Present a list of IT projects completed during the year",
      "Show the IT budget variance report"
    ],
    answer: "Translate IT performance metrics into business outcomes that resonate with board members (patient safety, financial impact, regulatory compliance)",
    explanation: "Board members are not IT experts; they are focused on organizational mission, financial performance, and risk. Translating IT metrics into business outcomes (e.g., 'our EHR upgrade reduced medication errors by 23%') is far more compelling than technical statistics."
  },
  {
    id: 89,
    domain: "Management and Leadership",
    type: "Recall",
    question: "What is the purpose of a 'Request for Information (RFI)' in IT procurement?",
    options: [
      "To formally request a vendor to provide a price quote",
      "To gather general information about vendor capabilities before issuing a formal RFP",
      "To request technical support from a vendor",
      "To notify vendors of a contract award"
    ],
    answer: "To gather general information about vendor capabilities before issuing a formal RFP",
    explanation: "An RFI is used in the early stages of procurement to gather general information about vendor capabilities, market solutions, and pricing ranges, helping organizations refine their requirements before issuing a formal Request for Proposal (RFP)."
  },
  {
    id: 90,
    domain: "Management and Leadership",
    type: "Application",
    question: "A hospital's IT director is asked to develop key performance indicators (KPIs) for the IT help desk. Which KPI would BEST measure customer satisfaction?",
    options: [
      "Number of tickets closed per day",
      "Average speed of answer",
      "First call resolution rate and customer satisfaction score",
      "Total number of tickets received per month"
    ],
    answer: "First call resolution rate and customer satisfaction score",
    explanation: "First call resolution rate (percentage of issues resolved on the first contact) and customer satisfaction scores directly measure the quality of the help desk experience from the user's perspective, which is the best indicator of customer satisfaction."
  },
  {
    id: 91,
    domain: "Management and Leadership",
    type: "Scenario-Based Analysis",
    question: "A hospital's IT department is implementing a new IT service management (ITSM) framework. The change management process requires all changes to go through a Change Advisory Board (CAB). An emergency security patch needs to be deployed immediately due to an active vulnerability being exploited. What is the MOST appropriate action?",
    options: [
      "Wait for the next scheduled CAB meeting before deploying the patch",
      "Deploy the patch immediately without any approval process",
      "Use the emergency change process to obtain expedited approval from designated emergency CAB members",
      "Notify the CAB after the patch has been deployed"
    ],
    answer: "Use the emergency change process to obtain expedited approval from designated emergency CAB members",
    explanation: "ITSM frameworks include an emergency change process for situations where immediate action is required to prevent significant harm. This process allows expedited approval from designated emergency CAB members while maintaining governance and accountability."
  },
  {
    id: 92,
    domain: "Management and Leadership",
    type: "Recall",
    question: "What is the primary purpose of IT portfolio management in a healthcare organization?",
    options: [
      "To manage the organization's investment portfolio",
      "To oversee and optimize the collection of IT projects and systems to maximize value and align with strategy",
      "To track the performance of individual IT staff",
      "To manage vendor relationships and contracts"
    ],
    answer: "To oversee and optimize the collection of IT projects and systems to maximize value and align with strategy",
    explanation: "IT portfolio management provides a holistic view of all IT investments (projects, systems, and services), enabling organizations to optimize resource allocation, manage risk, and ensure alignment with strategic objectives."
  },
  {
    id: 93,
    domain: "Management and Leadership",
    type: "Application",
    question: "A hospital's IT director is developing job descriptions for a new clinical informatics team. Which approach ensures the roles are appropriately defined?",
    options: [
      "Copy job descriptions from other hospitals",
      "Conduct a job analysis to identify required competencies, then align roles with organizational needs and industry standards",
      "Ask the IT staff to write their own job descriptions",
      "Use generic IT job descriptions from HR templates"
    ],
    answer: "Conduct a job analysis to identify required competencies, then align roles with organizational needs and industry standards",
    explanation: "A job analysis identifies the specific tasks, responsibilities, and competencies required for each role based on organizational needs. Aligning with industry standards ensures competitive positioning for recruitment and retention."
  },
  {
    id: 94,
    domain: "Management and Leadership",
    type: "Scenario-Based Analysis",
    question: "A hospital's CIO is informed that the organization will be merging with another health system in 12 months. The merged entity will need to consolidate IT systems. What should the CIO do FIRST?",
    options: [
      "Immediately begin decommissioning redundant systems",
      "Conduct a comprehensive IT assessment of both organizations to understand the current state of systems, contracts, and infrastructure",
      "Select the EHR system for the merged entity",
      "Announce the IT consolidation plan to all staff"
    ],
    answer: "Conduct a comprehensive IT assessment of both organizations to understand the current state of systems, contracts, and infrastructure",
    explanation: "Before any consolidation decisions can be made, the CIO must understand the current state of IT systems, contracts, infrastructure, and staff at both organizations. This assessment provides the foundation for developing an informed integration strategy."
  },
  {
    id: 95,
    domain: "Management and Leadership",
    type: "Recall",
    question: "What is the purpose of a 'succession plan' in healthcare IT management?",
    options: [
      "To plan for system upgrades and replacements",
      "To ensure continuity of leadership by identifying and developing future leaders for key IT positions",
      "To document the process for transitioning to a new vendor",
      "To plan for staff reductions during budget cuts"
    ],
    answer: "To ensure continuity of leadership by identifying and developing future leaders for key IT positions",
    explanation: "A succession plan identifies high-potential employees and develops them for future leadership roles, ensuring organizational continuity and reducing the risk of leadership gaps when key positions become vacant."
  },
  {
    id: 96,
    domain: "Management and Leadership",
    type: "Application",
    question: "A hospital's IT director wants to improve the IT department's customer service culture. Which approach would be MOST effective as a starting point?",
    options: [
      "Implement a new ticketing system",
      "Conduct a customer satisfaction survey to identify specific pain points and prioritize improvement areas",
      "Require all IT staff to attend customer service training",
      "Increase IT staffing levels"
    ],
    answer: "Conduct a customer satisfaction survey to identify specific pain points and prioritize improvement areas",
    explanation: "Before implementing solutions, understanding the specific pain points from the customer's perspective is essential. A satisfaction survey provides data-driven insights to prioritize improvement efforts and measure progress over time."
  },
  {
    id: 97,
    domain: "Management and Leadership",
    type: "Scenario-Based Analysis",
    question: "A hospital's IT department is consistently missing project deadlines. Analysis shows that IT staff are assigned to too many projects simultaneously, causing context-switching and reduced productivity. What management intervention would MOST effectively address this problem?",
    options: [
      "Hire more IT staff",
      "Implement a work-in-progress (WIP) limit and prioritize projects through the IT governance process",
      "Require staff to work overtime until projects are completed",
      "Outsource project management to a consulting firm"
    ],
    answer: "Implement a work-in-progress (WIP) limit and prioritize projects through the IT governance process",
    explanation: "Research shows that multitasking and context-switching significantly reduce productivity. Implementing WIP limits (a Kanban principle) and prioritizing projects through governance ensures staff can focus on fewer projects at a time, improving throughput and quality."
  },
  {
    id: 98,
    domain: "Management and Leadership",
    type: "Recall",
    question: "What is the primary purpose of a 'vendor management program' in healthcare IT?",
    options: [
      "To negotiate the lowest possible prices from vendors",
      "To manage the full lifecycle of vendor relationships, including selection, contracting, performance monitoring, and risk management",
      "To process vendor invoices and payments",
      "To maintain a list of approved vendors"
    ],
    answer: "To manage the full lifecycle of vendor relationships, including selection, contracting, performance monitoring, and risk management",
    explanation: "A vendor management program provides a structured approach to managing vendor relationships throughout their lifecycle, ensuring vendors deliver value, meet contractual obligations, and pose acceptable risk to the organization."
  },
  {
    id: 99,
    domain: "Management and Leadership",
    type: "Application",
    question: "A hospital's IT director is asked to reduce the IT department's operating budget by 15% without reducing service quality. Which approach would MOST effectively achieve this goal?",
    options: [
      "Reduce IT staff headcount by 15%",
      "Conduct a comprehensive IT cost analysis to identify redundant systems, underutilized licenses, and inefficient processes for optimization",
      "Defer all non-critical IT projects for one year",
      "Renegotiate all vendor contracts simultaneously"
    ],
    answer: "Conduct a comprehensive IT cost analysis to identify redundant systems, underutilized licenses, and inefficient processes for optimization",
    explanation: "A comprehensive cost analysis identifies specific opportunities for savings (e.g., consolidating redundant systems, eliminating unused licenses, automating manual processes) that can achieve budget targets without reducing service quality or staff."
  },
  {
    id: 100,
    domain: "Management and Leadership",
    type: "Scenario-Based Analysis",
    question: "A hospital's CIO is asked by the CEO to implement an AI-powered clinical decision support tool that promises to reduce diagnostic errors by 40%. The vendor's evidence is based on a single study conducted in a different country with different patient demographics. What should the CIO recommend?",
    options: [
      "Implement the tool immediately to gain a competitive advantage",
      "Decline the implementation as the evidence is insufficient",
      "Recommend a pilot study with local patient data and clinical validation before full deployment, with defined success metrics",
      "Ask the vendor to provide a money-back guarantee"
    ],
    answer: "Recommend a pilot study with local patient data and clinical validation before full deployment, with defined success metrics",
    explanation: "Evidence from a single study in a different demographic context cannot be generalized without validation. A pilot study with local patient data allows the organization to validate the tool's performance in its specific context, identify potential issues, and make an evidence-based deployment decision, balancing innovation with patient safety."
  }
];

export const domains: Domain[] = [
  "Healthcare and Technology Environments",
  "Clinical Informatics",
  "Healthcare Information and Systems Management",
  "Management and Leadership"
];

export const questionTypes: QuestionType[] = ["Recall", "Application", "Scenario-Based Analysis"];
