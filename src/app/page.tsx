"use client";
import PhotoCards from "@/sections/image-cards";
import Header from "@/sections/header";
import NavBar from "@/sections/nav-bar";
import { TechStack } from "@/sections/tech-stack";
import Services from "@/sections/services";
import { TimeLine } from "@/sections/time-line";
import Footer from "@/sections/footer";
import Projects from "@/sections/projects";
import { BackgroundBeams } from "@/components/background-beams";
import ReelsVideosContainer from "@/sections/videos-section";

export default function Home() {
  return (
    <div className="w-full max-w-full max-h-full">
      <NavBar />

      {/* Header */}
      <section className="w-full h-full max-w-full">
        <Header />
      </section>

      {/* Timeline */}
      <section id="timeline" className="w-full h-full max-w-full p-5 mt-5">
        <TimeLine />
      </section>

      {/* Services */}
      <section id="services" className="w-full h-full max-w-full p-5">
        <Services />
      </section>

      {/* Tech Stack */}
      <section id="TechStack" className="w-full h-full max-w-full p-5">
        <TechStack />
      </section>

      {/* Projects */}
      <section id="projects" className="w-full h-full max-w-full p-5">
        <Projects />
      </section>

      {/* Photography */}
      <section id="Photography" className="w-full h-full max-w-full p-5">
        <PhotoCards />
      </section>

      {/* Videography */}
      <section id="videography" className="w-full h-full max-w-full p-5">
        <ReelsVideosContainer />
      </section>

      {/* Footer / Contact — has id="contact" built in */}
      <Footer />

      <BackgroundBeams />
    </div>
  );
}
