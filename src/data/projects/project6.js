const project6 = {
  id: "project6",
  title: "Comparative Analysis of Data-Driven GNN-Based Path Planning and Classical Search Algorithms",
  dates: "Oct 2025 – Jan 2026",
  description: [
    "Built an end-to-end path planning pipeline using GraphSAGE-based GNNs to learn node-level path saliency from randomized grid environments and A* reference solutions.",
    "Compared classical A* search with learning-guided approaches, including greedy neural decoding and a hybrid “Neural A*” method that integrates GNN predictions into heuristic search.",
    "Evaluated planner reliability, search efficiency, and zero-shot generalization across larger grid sizes, highlighting trade-offs between learned heuristics and classical optimal search methods",
  ],
  techStack: ["python", "pytorch", "pyg"],
  thumbnail: process.env.PUBLIC_URL + "/images/projects/gnn_project_cover.png" // ✅ now valid JS
};

export default project6;
