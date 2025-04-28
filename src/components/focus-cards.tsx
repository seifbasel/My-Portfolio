"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 overflow-hidden w-full transition-all duration-300 ease-out aspect-[9/16]", // Changed to vertical 9:16 aspect ratio
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <Image
        src={card.src}
        alt={card.title}
        fill
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const scrollAmount = direction === "left" ? -150 : 150;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full px-4  md:px-20">
      {/* Main card grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-4   max-w-full gap-4 mx-auto w-full">
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>
      {/* Mobile main card */}
      <div className="md:hidden relative overflow-hidden aspect-[9/16] w-72  mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={cards[currentIndex].title}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full"
          >
            <Card
              card={cards[currentIndex]}
              index={currentIndex}
              hovered={hovered}
              setHovered={setHovered}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Thumbnail Gallery */}
      <div className="md:hidden flex items-center gap-2 mt-4 relative">
        <button
          onClick={() => scrollGallery("left")}
          className="absolute left-0 z-10 bg-black/50 p-2 rounded-full text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <div
          ref={galleryRef}
          className="flex overflow-x-auto space-x-2 py-2 px-2 scrollbar-hide"
        >
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-12 h-20 rounded-lg overflow-hidden transition-all flex-shrink-0",
                currentIndex === index
                  ? "ring-2 ring-blue-500 scale-110"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <div className="relative w-full h-full">
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollGallery("right")}
          className="absolute right-0 z-10 bg-black/50 p-2 rounded-full text-white"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
