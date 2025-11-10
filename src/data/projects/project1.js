const project1 = {
  id: "project1",
  title: "MedLedger: A Secure, Modular EHR System Integrating FHIR Standards and Blockchain Auditability",
  dates: "Mar 2025 – May 2025",
  description: [
    "Developed a secure, modular Electronic Health Record (EHR) system with containerized microservices.",
    "Integrated HL7 FHIR standards for interoperability and blockchain-based audit logging for data integrity.",
    "Implemented ML-driven anomaly detection to enhance security and reliability.",
    "Presented at the 2025 TDK Student Scientific Conference (Special Mention, Software Technology Division)."
  ],
  techStack: ["python", "fastapi", "react", "docker", "mongodb", "ethereum"],
  thumbnail: process.env.PUBLIC_URL + "/images/projects/medLedger_logo.png" // ✅ now valid JS
};

export default project1;
