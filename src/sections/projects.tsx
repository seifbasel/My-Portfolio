import { ThreeDCard } from "@/components/ui/project-card";
import React from "react";

const Projects = () => {
  const projectData = [
    {
      title: "Nike Website Clone",
      description:
        "An e-commerce website that replicates the Nike online store, featuring product pages, and a smooth user experience for shopping shoes and clothing.",
      thumbnail: "/images/nike-website.png",
      link: "https://e-commerce-nike-website.vercel.app/",
      info_link: "https://github.com/seifbasel/Nike-E_Commerce-Website",
    },
    {
      title: "Diabetes Classification",
      description:
        "A web application that allows users to input their health data and provides a prediction of their likelihood of having diabetes using machine learning algorithms.",
      thumbnail: "/images/Diabetes-Classification.png",
      link: "https://github.com/seifbasel/Diabetes-Classification-Website/blob/main/project%20demo.mp4",
      info_link: "https://github.com/seifbasel/Diabetes-Classification-Website",
    },
    {
      title: "Prova 3D Virtual Try-On",
      description:
        "An innovative platform that leverages Augmented Reality (AR) to let users virtually try on clothes and shoes, enhancing their shopping experience.",
      thumbnail: "/images/prova-3d-website.png",
      link: "https://prova-3d.vercel.app/",
      info_link: "https://github.com/seifbasel/Prova-3d-Website",
    },
    {
      title: "Coinat - Coin & Currency Exchange Online Store",
      description:
        "An e-commerce website dedicated to buying and selling authentic coins and currency from various cultures and time periods, making it a unique marketplace for numismatics enthusiasts.",
      thumbnail: "/images/coinat-website.png",
      link: "https://coinat.vercel.app/",
      info_link: "https://github.com/seifbasel/Coinat-Website",
    },
    {
      title: "TransHub - Localization & Translation Platform",
      description:
        "A comprehensive platform that automates the localization and translation process for Transfective company, It tracks project progress from initiation to delivery and payment, optimizing workflow efficiency.",
      thumbnail: "/images/transhub.png",
      link: "https://transhub.vercel.app/",
    },
    {
      title: "Transfective HR - Internal Employee Management System",
      description:
        "An internal HR management system designed for handling employee tasks, leave requests, interviews, and personnel management, streamlining human resources operations within an organization.",
      thumbnail: "/images/transfective-hr.png",
      link: "https://transfective-hr.vercel.app/",
    },
    {
      title: "LMS - Library Management System",
      description:
        "A system that helps manage library operations, including tracking books, managing user accounts, checking in and out books, and keeping records of overdue items.",
      thumbnail: "/images/lms_website.png",
      info_link:
        "https://github.com/seifbasel/Library-Management-System-Website",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {projectData.map((project, index) => (
        <ThreeDCard
          key={index}
          title={project.title}
          description={project.description}
          thumbnail={project.thumbnail}
          link={project.link}
          info_link={project.info_link}
        />
      ))}
    </div>
  );
};

export default Projects;
