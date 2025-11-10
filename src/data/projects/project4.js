const project4 = {
  id: "project4",
  title:
    "Radiology Differential Generator – Evidence-Based Reasoning RAG System",
  dates: "2025",
  description: [
    "Developed an AI-powered diagnostic assistant using Retrieval-Augmented Generation (RAG) for automated differential diagnosis generation.",
    "Integrated a FAISS vector database to enhance semantic retrieval across 10+ medical knowledge sources.",
    "Built an explainable Streamlit interface enabling clinicians to validate AI reasoning chains and outputs."
  ],
  techStack: ["python", "langchain", "mistral", "streamlit"],
  thumbnail: process.env.PUBLIC_URL + "/images/projects/radiology_rag.png" // ✅ resolves locally + on GitHub Pages
};

export default project4;
