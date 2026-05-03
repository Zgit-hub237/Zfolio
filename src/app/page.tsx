import Sidebar from "@/components/Sidebar";
import RightNav from "@/components/RightNav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Resume from "@/components/sections/Resume";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="bg-dark min-h-screen">
      {/* Fixed left sidebar */}
      <Sidebar />

      {/* Main scrollable content — offset by sidebar width on desktop */}
      <main className="lg:ml-[270px] lg:mr-10">
        <Hero />
        <About />
        <Resume />
        <Services />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Fixed right icon navigation */}
      <RightNav />
    </div>
  );
}
