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
import Footer2 from "@/components/ui/footer";
import ReelsVideosContainer from "@/sections/videos-section";
import DownloadCVButton from "@/components/cv-button";

export default function Home() {
  return (
    <div className="w-full max-w-full max-h-full">
      <NavBar />

      {/* Header Section */}
      <section className="flex flex-col items-center justify-center w-full max-w-full mx-auto">
        <Header />
        <DownloadCVButton />
      </section>

      {/* Timeline Section */}
      <section
        id="timeline"
        className="flex justify-center w-full h-full max-w-full p-10 py-40 mx-auto bg-background"
      >
        <TimeLine />
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="flex justify-center max-w-full px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="text-start">
          <h2 className="mb-10 text-4xl text-center font-rubik sm:text-7xl text-text">
            Services
          </h2>
          <div className="flex justify-center">
            <Services />
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="TechStack" className="w-full max-w-full p-5 mx-auto md:p-20">
        <TechStack />
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full h-full max-w-full py-10">
        <h2 className="text-4xl font-semibold text-center sm:text-5xl text-text">
          Projects
        </h2>
        <Projects />
      </section>

      {/* Photography Section */}
      <section
        id="Photography"
        className="w-full h-full max-w-full py-20 mx-auto md:py-40"
      >
        <h2 className="mb-10 text-4xl font-semibold text-center sm:text-5xl text-text">
          Photography
        </h2>
        <PhotoCards />
      </section>

      {/* Videography Section */}
      <section
        id="videography"
        className="w-full h-full max-w-full p-20 mx-auto md:py-40"
      >
        <h2 className="mb-10 text-4xl font-semibold text-center sm:text-5xl text-text">
          Videography
        </h2>
        <ReelsVideosContainer />
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full h-full max-w-full py-5 mx-auto ">
        <Footer />
      </section>

      {/* Footer2 Section */}
      <Footer2 />

      {/* Background Beams */}
      <BackgroundBeams />
    </div>
  );
}
