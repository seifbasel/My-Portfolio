"use client";

import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/background-beams-with-collision";
import { TypewriterEffectSmooth } from "@/components/typewriter-effect";

export function Footer() {
  const words = [
    {
      text: "Build",
      className: "text-lighttext dark:text-darktext",
    },
    {
      text: "awesome",
      className: "text-lighttext dark:text-darktext",
    },
    {
      text: "websites",
      className: "text-lighttext dark:text-darktext",
    },
    {
      text: "with",
      className: "text-lighttext dark:text-darktext",
    },
    {
      text: "me",
      className: "text-subtext dark:text-primary",
    },
  ];

  return (
    <BackgroundBeamsWithCollision>
      <div className="flex flex-col items-center justify-center h-[40rem]">
        <p className="text-lighttext dark:text-darktext text-md md:text-2xl">
          Turn your ideas into reality
        </p>
        <TypewriterEffectSmooth words={words} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <a
            href="mailto:seifbasel950@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className=" no-underline group cursor-pointer relative shadow-2xl shadow-darkbackground dark:bg-background rounded-full p-1 text-default md:text-4xl leading-5  text-lighttext dark:text-darktext inline-block">
              <div className="relative flex space-x-2 items-center  rounded-full bg-background dark:bg-darkBackground py-0.5 px-4 ring-1 ring-white/10 ">
                <span>Contact us</span>
                <svg
                  fill="none"
                  height="50"
                  viewBox="0 0 24 24"
                  width="40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </button>
          </a>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default Footer;
