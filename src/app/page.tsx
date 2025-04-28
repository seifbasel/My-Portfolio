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
import { MilitaryCountdownSection } from "@/sections/count-down";
import { ServiceScheduleSection } from "@/sections/army-calender";
import ReelsVideosContainer from "@/sections/videos-section";

export default function Home() {
  return (
    <div className="max-h-full max-w-full w-full">
      <NavBar />

      {/* Header Section */}
      <section className="w-full max-w-full mx-auto">
        <Header />
      </section>

      {/* Countdown Section */}
      <section id="countdown" className="w-full max-w-full mx-auto p-10 py-20">
        <MilitaryCountdownSection />
      </section>

      {/* Service Schedule Section */}
      <section
        id="service-schedule"
        className=" md:block w-full max-w-full mx-auto py-20"
      >
        <ServiceScheduleSection />
      </section>

      {/* Timeline Section */}
      <section
        id="timeline"
        className="bg-background flex justify-center w-full h-full max-w-full mx-auto p-10 py-40"
      >
        <TimeLine />
      </section>

      {/* Services Section */}
      <section
        id="services"
        className=" max-w-full flex justify-center py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="text-start">
          <h2 className="text-center text-4xl sm:text-7xl text-text mb-10">
            Services
          </h2>
          <div className="flex justify-center">
            <Services />
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="TechStack" className="w-full max-w-full mx-auto p-5 md:p-20">
        <TechStack />
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full h-full max-w-full mx-auto py-10">
        <h2 className="text-center text-4xl sm:text-5xl text-text">Projects</h2>
        <Projects />
      </section>

      {/* Photography Section */}
      <section
        id="Photography"
        className=" w-full h-full max-w-full mx-auto py-20 md:py-40"
      >
        <h2 className="text-center text-4xl sm:text-5xl  text-text mb-10">
          Photography
        </h2>
        <PhotoCards />
      </section>

      {/* Videography Section */}
      <section
        id="videography"
        className=" w-full h-full max-w-full mx-auto p-20 md:py-40"
      >
        <h2 className="text-center text-4xl sm:text-5xl text-text mb-10">
          Videography
        </h2>
        <ReelsVideosContainer />
      </section>

      {/* Contact Section */}
      <section id="contact" className=" w-full h-full max-w-full mx-auto py-5">
        <Footer />
      </section>

      {/* Footer2 Section */}
      <Footer2 />

      {/* Background Beams */}
      <BackgroundBeams />
    </div>
  );
}
