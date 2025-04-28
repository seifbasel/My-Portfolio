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
      title: "Frontend Development",
      steps: [
        "builds attractive website interfaces",
        "customizes according to users' vision",
        "provides a seamless user experience",
        "optimizes website for search engines",
        "ensures responsiveness on all devices",
      ],
      description:
        "Delivering responsive, and user-friendly interfaces that captivate users and provide a smooth experience.",
    },
    {
      title: "Backend Development",
      steps: [
        "builds robust and scalable backends",
        "designs and manages efficient databases",
        "integrates APIs and external services",
        "ensures high performance and scalability",
        "handles user system security",
      ],
      description:
        "Delivering reliable backend solutions for a seamless, secure, and scalable experience.",
    },
    {
      title: "Fullstack Development",
      steps: [
        "develops both client-side and server-side apps",
        "writes clean and maintainable code",
        "provides integration between frontend and backend",
        "optimizes the application for speed and performance",
        "deploys applications to a cloud service",
      ],
      description:
        "Bringing full-stack expertise to create comprehensive solutions that meet all your needs.",
    },
    {
      title: "Photography",
      steps: [
        "captures high-quality photos",
        "provides professional editing ",
        "specializes in portraits and landscape ",
        "ensures proper lighting and composition ",
        "delivers custom photo solutions ",
      ],
      description:
        "Creating stunning visuals that tell your story through the lens, capturing moments that last a lifetime.",
    },
    {
      title: "Photo & Video Editing",
      steps: [
        "enhances and retouch photos using  Photoshop",
        "edits video with precision in Premiere Pro",
        "adds cinematic effects and animations",
        "delivers seamless transitions and audio",
        "optimizes media for all platforms",
      ],
      description:
        "Bringing your vision to life through talented editing, whether it's enhancing photos or editing videos.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
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
