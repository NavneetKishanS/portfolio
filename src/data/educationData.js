const educationData = [
  {
    degree: "BSc in Computer Science",
    institution: "Eötvös Loránd University (ELTE)",
    location: "Budapest, Hungary",
    duration: "2022 – 2025",
    logo: process.env.PUBLIC_URL + "/logos/ELTE_logo.png", // ✅ works locally + on GitHub Pages
    description: [
      "Grade: 4.0/5.0 (≈ 2.0 in Bavarian system)",
      "Thesis: MedLedger: A Secure, Modular EHR System — Designed a scalable, containerized EHR integrating HL7 FHIR standards, blockchain-based audit logging, and ML-driven anomaly detection; presented at the 2025 TDK Student Scientific Conference (Special Mention, Software Technology Division)."
    ]
  }
];

export default educationData;
