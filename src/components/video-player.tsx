"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Video {
  id: number;
  src: string;
  title: string;
  coverImage: string;
}

interface ReelsVideosProps {
  videos: Video[];
}

export default function ReelsVideos({ videos }: ReelsVideosProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const prevVideo = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const nextVideo = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const scrollAmount = direction === "left" ? -150 : 150;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      {/* Video Player */}
      <div className="relative w-full">
        <video
          key={videos[currentIndex].id}
          controls
          className="w-full rounded-lg shadow-lg"
        >
          <source src={videos[currentIndex].src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Prev/Next Buttons */}
        <button
          onClick={prevVideo}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextVideo}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-4 flex space-x-2">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>

      {/* Thumbnails */}
      <div className="w-full mt-6 relative">
        <button
          onClick={() => scrollGallery("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-1 rounded-full text-white"
        >
          <ChevronLeft size={16} />
        </button>

        <div
          ref={galleryRef}
          className="flex overflow-x-auto space-x-3 px-6 py-2 scrollbar-hide"
        >
          {videos.map((video, index) => (
            <button
              key={video.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-shrink-0 rounded-md overflow-hidden transition-all ${
                index === currentIndex
                  ? "ring-2 ring-blue-500 scale-105"
                  : "opacity-75 hover:opacity-100"
              }`}
            >
              <div className="w-20 h-32 sm:w-24 sm:h-36 relative">
                <Image
                  src={video.coverImage}
                  alt={video.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-1 truncate">
                {video.title}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollGallery("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-1 rounded-full text-white"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
