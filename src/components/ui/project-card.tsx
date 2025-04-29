"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/3d-card";

type ThreeDCardProps = {
  title: string;
  description: string;
  thumbnail: string;
  link?: string;
  info_link?: string;
};

export function ThreeDCard({
  title,
  description,
  thumbnail,
  link,
  info_link,
}: ThreeDCardProps) {
  return (
    <CardContainer className="inter-var p-5">
      <CardBody className="relative group/card bg-opacity-20 backdrop-filter backdrop-blur-lg bg-white/90 dark:bg-white/90 border border-gray-200 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 w-80 md:w-full h-full rounded-xl p-6">
        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute inset-0 -translate-x-full group-hover/card:translate-x-full transition-all duration-1000 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        </div>
        
        <CardItem 
          translateZ="50" 
          className="text-xl font-bold text-darktext bg-clip-text"
        >
          {title}
        </CardItem>
        
        <CardItem
          translateZ="60"
          className="text-sm max-w-sm mt-2 text-subtext dark:text-subtext/80"
        >
          {description}
        </CardItem>
        
        <CardItem translateZ="100" className="w-full mt-4">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={thumbnail}
              height="500"
              width="500"
              className="md:h-60 w-full object-contain group-hover/card:scale-105 transition-transform duration-300"
              alt="thumbnail"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-200/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
          </div>
        </CardItem>
        
        <div className="flex justify-between items-center mt-6">
          {link && (
            <CardItem
              translateZ={30}
              className="px-4 py-2 rounded-xl text-xs font-medium bg-primary/20 backdrop-blur-sm border border-primary/20 text-gray-800 dark:text-gray-800 hover:bg-primary/30 transition-all duration-300"
            >
              <Link href={link} target={link} className="flex items-center gap-2">
                <span>Live Demo</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>
            </CardItem>
          )}
          {info_link && (
            <CardItem
              translateZ={30}
              className="px-4 py-2 rounded-xl bg-gray-100/70 backdrop-blur-sm border border-gray-200 text-gray-800 dark:text-gray-800 text-xs font-medium hover:bg-gray-200/70 transition-all duration-300"
            >
              <Link href={info_link} target="_blank" className="flex items-center gap-2">
                <span>More info</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </Link>
            </CardItem>
          )}
        </div>
      </CardBody>
    </CardContainer>
  );
}