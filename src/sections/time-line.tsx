"use client";
import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/timeline";
import Link from "next/link";
import { CheckIcon, GraduationCapIcon } from "lucide-react";

/* ── Image block — preserves your exact sizing logic ── */
const CardImg = ({
  src,
  alt,
  height,
}: {
  src: string;
  alt: string;
  height?: number;
}) => (
  <div
    className="w-full rounded-md overflow-hidden flex-shrink-0"
    style={height ? { height } : undefined}
  >
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={800}
      className={`w-full ${height ? "h-full object-cover" : "h-auto object-contain"}`}
    />
  </div>
);

/* ── Logo block ── */
const CardLogo = ({
  src,
  alt,
  href,
  w,
  h,
}: {
  src: string;
  alt: string;
  href?: string;
  w: number;
  h: number;
}) => {
  const el = (
    <div className="relative flex-shrink-0" style={{ width: w, height: h }}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain hover:opacity-80 transition-opacity"
      />
    </div>
  );
  return href ? (
    <Link href={href} target="_blank" rel="noreferrer">
      {el}
    </Link>
  ) : (
    el
  );
};

/* ── Bullet — check icon uses --color-primary ── */
const Bullet = ({ text }: { text: string }) => (
  <div className="flex items-start gap-2 text-xs text-subtext">
    <CheckIcon className="w-3 h-3 flex-shrink-0 mt-0.5 text-primary" />
    {text}
  </div>
);

export function TimeLine() {
  const data = [
    /* 01 */
    {
      title: "2020",
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-md leading-relaxed text-text">
            Enrolled in the Faculty of Computer and Artificial Intelligence at
            Damietta University — the start of my tech journey.
          </p>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <CardLogo
              src="/svgs/faculity-logo.svg"
              alt="Faculty logo"
              href="https://www.du.edu.eg/faculty/cis/en"
              w={150}
              h={150}
            />
            <CardLogo
              src="/svgs/uni-logo.svg"
              alt="Damietta University"
              href="https://www.du.edu.eg/en"
              w={200}
              h={120}
            />
          </div>
        </div>
      ),
    },

    /* 02 */
    {
      title: "September 2023",
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-md leading-relaxed text-text">
            Completed a 150-hour Web Development (Python) course at the
            Information Technology Institute (ITI).
          </p>
          <CardImg
            src="/images/ITI Django Web Framework.png"
            alt="ITI Web Development"
          />
        </div>
      ),
    },

    /* 03 */
    {
      title: "March 2024",
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-md leading-relaxed text-text">
            Completed Meta&apos;s &ldquo;Introduction to Back-End
            Development&rdquo; on Coursera — practical server-side programming
            concepts.
          </p>
          <CardImg src="/images/course-1.png" alt="Meta Back-End Certificate" />
        </div>
      ),
    },

    /* 04 */
    {
      title: "April 2024",
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-md leading-relaxed text-text">
            Completed Meta&apos;s &ldquo;Django Web Framework&rdquo; on Coursera
            — building scalable Python-based web applications.
          </p>
          <CardImg src="/images/course-2.png" alt="Meta Django Certificate" />
        </div>
      ),
    },

    /* 05 */
    {
      title: "June 2024",
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-md leading-relaxed text-text">
            Earned a B.Sc. degree in Computer Science &amp; AI <br />
            from Damietta University.
          </p>
          <div className="flex items-center gap-2 text-xs font-medium text-primary">
            <GraduationCapIcon className="w-3.5 h-3.5 flex-shrink-0" />
            Ranked 16th · Honors graduate
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <CardImg src="/images/graduation-ceremony.JPG" alt="Ceremony" />
            <CardImg src="/images/graduation.jpg" alt="Graduation" />
          </div>
        </div>
      ),
    },

    /* 06 */
    {
      title: "July 2024",
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-md leading-relaxed text-text">
            Joined Transfective as a full-time Software Developer, building an
            enterprise localization platform that automated end-to-end
            workflows.
          </p>
          <div className="flex flex-col gap-4">
            <Bullet text="Scalable frontend translation interfaces" />
            <Bullet text="cut delivery time by 50%, and supported 1,000+ daily users" />
          </div>
          <CardLogo
            src="/svgs/transfective.svg"
            alt="Transfective"
            href="https://transfective.com"
            w={250}
            h={50}
          />
        </div>
      ),
    },

    /* 07 */
    {
      title: "September 2024",
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-md leading-relaxed text-text">
            Completed Meta&apos;s &ldquo;APIs&rdquo; course on Coursera <br />
            building robust and scalable web service interfaces.
          </p>
          <CardImg src="/images/course-3.png" alt="Meta APIs Certificate" />
        </div>
      ),
    },

    /* 08 */
    {
      title: "January 2025",
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-md leading-relaxed text-text">
            Began mandatory military service in the Egyptian Armed Forces,
            serving as an IT specialist supporting digital operations.
          </p>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col gap-4 pt-4">
              <Bullet text="IT infrastructure & support" />
              <Bullet text="Developed a system to track faults and malfunctions." />
            </div>

            <CardLogo
              src="/images/armedforces.png"
              alt="Egyptian Armed Forces"
              href="https://www.mod.gov.eg/"
              w={100}
              h={100}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
