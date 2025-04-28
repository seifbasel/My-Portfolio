import { FocusCards } from "@/components/focus-cards";
import React from "react";

const PhotoCards = () => {
  const cards = [
    {
      title: "Cairo Train Station",
      src: "/cam_images/1.jpg",
    },
    {
      title: "Random bird in a tree",
      src: "/cam_images/2.jpg",
    },
    {
      title: "Karnak Temple",
      src: "/cam_images/3.jpg",
    },
    {
      title: "Random bird in a tree",
      src: "/cam_images/4.jpg",
    },
    {
      title: "Aswan Nile River",
      src: "/cam_images/5.jpg",
    },
    {
      title: "My Setup",
      src: "/cam_images/6.jpg",
    },
    {
      title: "Luxor Nile river",
      src: "/cam_images/7.jpg",
    },
    {
      title: "Ras Elbar sunset",
      src: "/cam_images/8.jpg",
    },
    {
      title: "Ras Elbar Streets",
      src: "/cam_images/9.jpg",
    },
    {
      title: "Sharm El-Sheikh Red Sea",
      src: "/cam_images/10.jpg",
    },
    {
      title: "Cairo Tower",
      src: "/cam_images/11.jpg",
    },
    {
      title: "Ras Elbar Sea",
      src: "/cam_images/12.jpg",
    },
    
  ];
  return (
    <div>
      <FocusCards cards={cards} />
    </div>
  );
};

export default PhotoCards;
