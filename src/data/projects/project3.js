const project3 = {
  id: "project3",
  title: "Labyrinth – Java Swing Based Game",
  dates: "Dec 2024 – Dec 2024",
  description: [
    "Engineered a Java-based Labyrinth game using Swing GUI with object-oriented design patterns for modularity and scalability.",
    "Implemented dynamic maze generation, player visibility constraints, and real-time dragon movement logic.",
    "Integrated a MySQL database using JDBC to persist player progress, compute high scores, and optimize query performance for real-time data retrieval."
  ],
  techStack: ["java", "mysql", "jdbc"],
  thumbnail: process.env.PUBLIC_URL + "/images/projects/labyrinth.png" // ✅ works locally + on GitHub Pages
};

export default project3;
