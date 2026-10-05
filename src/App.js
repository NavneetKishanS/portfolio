import React from "react";
import { ThemeProvider } from "./ThemeContext";
import "./themes.css";
import IntroSplash from "./components/IntroSplash";
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Statement from "./components/Statement";


function App() {
  return (
    <ThemeProvider>
      <IntroSplash />
      <Header />
      <main>
        <Hero />
        <Statement />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
    </ThemeProvider>
  );
}

export default App;
