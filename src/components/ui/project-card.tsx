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
      <CardBody className="relative group/card hover:shadow-xl hover:shadow-primary transation-all duration-200 bg-white w-80 md:w-full h-full rounded-xl p-5 border">
        <CardItem translateZ="50" className="text-xl font-bold text-dark">
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-sm max-w-sm mt-2 text-secondary"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={thumbnail}
            height="500"
            width="500"
            className="md:h-60 w-full object-contain group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center p-5">
          {link && (
            <CardItem
              translateZ={20}
              as={Link}
              href={link}
              target={link}
              className="px-4 py-2 rounded-xl text-md font-normal text-dark"
            >
              Live Demo
            </CardItem>
          )}
          {info_link && (
            <CardItem
              translateZ={20}
              as={Link}
              href={info_link}
              target="_blank"
              className="px-4 py-2 rounded-xl bg-background  text-text text-xs font-bold"
            >
              More info
            </CardItem>
          )}
        </div>
      </CardBody>
    </CardContainer>
  );
}
