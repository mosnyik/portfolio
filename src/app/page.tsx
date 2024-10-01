// import LandingPage from "../components/LandinPage";
// import About from "../components/About";
// import Skills from "../components/Skills";
// import Projects from "../components/Projects";
// import Contact from "@/components/Contact";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-white">
//       <LandingPage />
//       <About />
//       <Skills />
//       <Projects />
//       <Contact />
//     </main>
//   );
// }


import LandingPage from "../components/LandinPage";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <section id="home">
        <LandingPage />
      </section>
      <section id="about">
        <About />
        <Skills />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}