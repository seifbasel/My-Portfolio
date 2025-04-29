"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// tech stack grid component

const RowWrapper = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export const GridStack = () => {
  const images = [
    "/svgs/html.svg",
    "/svgs/css.svg",
    "/svgs/javascript.svg",
    "/svgs/bootstrap.svg",
    "/svgs/tailwindcss.svg",
  ];
  const images2 = [
    "/svgs/typescript.svg",
    "/svgs/react.svg",
    "/svgs/next.svg",
    "/svgs/vite.svg",
    "/svgs/vercel.svg",
  ];
  const images3 = [
    "/svgs/python.svg",
    "/svgs/django.svg",
    "/svgs/sql.svg",
    "/svgs/postgresql.svg",
    "/svgs/sqlite.svg",
  ];
  const images4 = [
    "/svgs/github.svg",
    "/svgs/git.svg",
    "/svgs/vscode.svg",
    "/svgs/postman.svg",
    "/svgs/figma.svg",
  ];

  const allImages = [images, images2, images3, images4];

  const [rotations, setRotations] = useState<number[][]>([]);

  useEffect(() => {
    // Generate random rotations once on client side
    const generatedRotations = allImages.map((row) =>
      row.map(() => Math.random() * 20 - 10)
    );
    setRotations(generatedRotations);
  }, []);

  const imageVariants = {
    whileHover: {
      scale: 1.5,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.5,
      rotate: 0,
      zIndex: 100,
    },
  };

  const renderRow = (images: string[], rowIndex: number) => (
    <RowWrapper key={`row-${rowIndex}`} index={rowIndex}>
      <div className="flex flex-row md:-ml-20">
        {images.map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={`image-${rowIndex}-${idx}`}
            style={{
              rotate: rotations[rowIndex]?.[idx] || 0,
            }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-gradient-to-b from-primary to-background flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="tech stack image"
              width={500}
              height={500}
              className="rounded-lg h-20 w-20 md:h-36 md:w-36 object-contain flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>
    </RowWrapper>
  );

  if (rotations.length === 0) return null;

  return (
    <div className="relative flex flex-col items-center justify-center md:p-20 gap-10 md:gap-5 h-full w-full">
      {renderRow(images, 0)}
      {renderRow(images2, 1)}
      {renderRow(images3, 2)}
      {renderRow(images4, 3)}
    </div>
  );
};

export default GridStack;
