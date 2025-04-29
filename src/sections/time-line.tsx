import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/timeline";
import Link from "next/link";
import { CheckIcon, GraduationCapIcon } from "lucide-react";

export function TimeLine() {
  const data = [
    {
      title: "2020",
      content: (
        <div>
          <p className="text-text md:text-2xl max-w-2xl mb-8 py-5">
            Enrolled in the Faculty of Computer and Artificial Intelligence at
            Damietta University, starting my academic journey in tech.
          </p>

          <div className="py-10 flex flex-col md:flex-row justify-start items-center gap-4">
            <Link href="https://www.du.edu.eg/faculty/cis/en">
              <Image
                src="/svgs/faculity-logo.svg"
                alt="Faculty of Computer and AI logo"
                width={500}
                height={500}
                className="rounded-lg object-contain h-48 w-48"
              />
            </Link>
            <Link href="https://www.du.edu.eg/en">
              <Image
                src="/svgs/uni-logo.svg"
                alt="Damietta University logo"
                width={500}
                height={500}
                className="rounded-lg object-contain h-48 w-full"
              />
            </Link>
          </div>
        </div>
      ),
    },
    {
      title: "2023 September",
      content: (
        <div>
          <p className="text-text md:text-2xl max-w-2xl mb-8 py-5">
            Successfully completed a 150-hour Web Development course using
            Python, offered by the Information Technology Institute (ITI).
          </p>

          <div className="flex flex-col md:flex-row justify-start items-center">
            <Image
              src="/images/iti-training.jpg"
              alt="ITI Web Development Course"
              width={500}
              height={500}
              className="rounded-lg object-contain h-full w-80"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2024 March",
      content: (
        <div>
          <p className="text-text md:text-2xl max-w-2xl mb-8 py-5">
            Completed Meta&apos;s &quot;Introduction to Back-End Development&quot; course on
            Coursera, gaining practical knowledge in server-side programming
            concepts.
          </p>
          <div className="flex flex-col md:flex-row justify-start items-center">
            <Image
              src="/images/course-1.png"
              alt="Meta Back-End Course Certificate"
              width={500}
              height={500}
              className="rounded-lg object-contain h-full w-80"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2024 April",
      content: (
        <div>
          <p className="text-text md:text-2xl max-w-2xl mb-8 py-5">
            Advanced my web development skills through Meta&apos;s &quot;Django Web
            Framework&quot; course on Coursera, focusing on scalable Python-based
            applications.
          </p>

          <div className="flex flex-col md:flex-row justify-start items-center">
            <Image
              src="/images/course-2.png"
              alt="Meta Django Course Certificate"
              width={500}
              height={500}
              className="rounded-lg object-contain h-full w-80"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2024 June",
      content: (
        <div>
          <p className="text-text md:text-2xl max-w-2xl mb-8 py-5">
            Earned a Bachelor&apos;s degree in Computer Science and Artificial
            Intelligence from Damietta University.
          </p>
          <p className="text-text text-xs md:text-base font-normal mb-2">
            <GraduationCapIcon className="inline-block mr-2" /> Ranked 16th in
            the Computer Science Department.
          </p>
          <p className="text-text text-xs md:text-base font-normal mb-8">
            <GraduationCapIcon className="inline-block mr-2" /> Graduated with
            honors.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-5">
            <Image
              src="/images/graduation.jpg"
              alt="Graduation Certificate"
              width={500}
              height={500}
              className="rounded-lg object-contain h-full w-80"
            />
            <Image
              src="/images/graduation-ceremony.JPG"
              alt="Graduation Ceremony"
              width={500}
              height={500}
              className="rounded-lg object-contain h-full w-80"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2024 July",
      content: (
        <div>
          <p className="text-text md:text-2xl max-w-2xl mb-8 py-5">
            Joined Transfective as a full-time Software Developer, contributing
            to cutting-edge translation and localization technologies.
          </p>
          <p className="text-text  text-xs md:text-base font-normal mb-2">
            <CheckIcon className="inline-block mr-2" /> Enhanced translation
            infrastructure with scalable frontend solutions.
          </p>
          <p className="text-text text-xs md:text-base font-normal mb-2">
            <CheckIcon className="inline-block mr-2" /> Improved multilingual
            content delivery pipelines.
          </p>

          <div className="py-10 flex flex-col md:flex-row justify-start items-center">
            <Link
              href="https://transfective.com"
              target="_blank"
              rel="noreferrer"
              className="hover:underline text-pretty"
            >
              <Image
                src="/svgs/transfective.svg"
                alt="Transfective Logo"
                width={500}
                height={500}
                className="rounded-lg p-2 object-contain h-full w-full"
              />
            </Link>
          </div>
        </div>
      ),
    },
    {
      title: "2024 September",
      content: (
        <div>
          <p className="text-text md:text-2xl max-w-2xl mb-8 py-5">
            Completed Meta&apos;s &quot;APIs&quot; course on Coursera, focusing on building
            robust and scalable web service interfaces.
          </p>

          <div className="flex flex-col md:flex-row justify-start items-center">
            <Image
              src="/images/course-3.png"
              alt="Meta APIs Course Certificate"
              width={500}
              height={500}
              className="rounded-lg object-contain h-full w-80"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2025 January",
      content: (
        <div>
          <p className="text-text md:text-2xl max-w-2xl mb-8 py-5">
            Began mandatory military service in the Egyptian Armed Forces,
            serving as an IT specialist supporting digital operations.
          </p>

          <div className="flex flex-col md:flex-row justify-start items-center">
            <Link
              href="https://www.mod.gov.eg/"
              target="_blank"
              rel="noreferrer"
              className="text-pretty hover:text-pretty hover:underline"
            >
              <Image
                src="/images/armedforces.png"
                alt="Egyptian Armed Forces logo"
                width={500}
                height={500}
                className="rounded-lg object-contain h-full w-80"
              />
            </Link>
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