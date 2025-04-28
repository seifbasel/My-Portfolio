"use client";
import ReelsVideos from "@/components/video-player";

const videos = [
  {
    id: 1,
    src: "/videos/1.mp4",
    title: "day as software engineer",
    coverImage: "/images/cover1.JPG",
  },
  {
    id: 2,
    src: "/videos/2.mp4",
    title: "daily life",
    coverImage: "/images/cover2.JPG",
  },
  {
    id: 3,
    src: "/videos/3.mp4",
    title: "2024 recap",
    coverImage: "/images/cover3.JPG",
  },
  {
    id: 4,
    src: "/videos/4.mp4",
    title: "military life",
    coverImage: "/images/cover4.JPG",
  },
];

export default function ReelsVideosContainer() {
  return (
    <div className="flex flex-col items-center w-full max-w-md sm:max-w-lg  mx-auto">
      <ReelsVideos videos={videos} />
    </div>
  );
}
