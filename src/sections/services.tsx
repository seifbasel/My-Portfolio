import { CardSpotlightDemo } from "@/components/ui/card-component";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

const CardWrapper = ({
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
      transition={{ duration: 0.5, delay: index * 0.4 }}
    >
      {children}
    </motion.div>
  );
};

const Services = () => {
  const cardData = [
    {
      title: "Fullstack Development",
      steps: [
        "responsive web interfaces",
        "scalable backend systems",
        "secure database management",
        "performance and SEO",
        "cloud deployment services",
      ],
      description:
        "Delivering comprehensive fullstack solutions with attractive interfaces and robust backend systems that provide secure and scalable experiences",
    },
    {
      title: "Photography",
      steps: [
        "professional portrait photography",
        "outdoor photo shoots",
        "artistic composition lighting",
        "creative direction concepts",
        "fast quality results",
      ],
      description:
        "Creating stunning visuals that tell your story through professional photography, capturing moments with artistic excellence",
    },
    {
      title: "Photo & Video Editing",
      steps: [
        "advanced photoshop techniques",
        "premiere pro editing",
        "cinematic effects graphics",
        "color grading audio",
        "multi platform optimization",
      ],
      description:
        "Transforming raw content into polished masterpieces through expert editing, bringing creative visions to life with professional results",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 mx-auto md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
      {cardData.map((card, index) => (
        <CardWrapper key={index} index={index}>
          <CardSpotlightDemo
            title={card.title}
            steps={card.steps}
            description={card.description}
          />
        </CardWrapper>
      ))}
    </div>
  );
};

export default Services;