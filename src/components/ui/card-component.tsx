import { CardSpotlight } from "@/components/card-spotlight";
import Image from "next/image";
import React from "react";

export function CardSpotlightDemo({
  title,
  steps,
  description,
  icon,
  className,
  style,
}: {
  title: string;
  steps: string[];
  description: string;
  icon?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <CardSpotlight className={`h-auto w-auto rounded-2xl ${className}`} style={style}>
      {icon && (
        <div className="relative z-20 w-12 h-12 mb-4">
          <Image src={icon} alt={`${title} icon`} width={48} height={48} className="object-contain" />
        </div>
      )}
      <p className="text-xl font-bold relative z-20 mt-2 text-text">{title}</p>

      <div className="text-text mt-4 relative z-20">
        <ul className="list-none mt-2">
          {steps.map((step, index) => (
            <Step key={index} title={step} />
          ))}
        </ul>
      </div>

      <p className="text-secondary mt-4 relative z-20 text-sm">{description}</p>
    </CardSpotlight>
  );
}


// Step Component
const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-lighttext dark:text-darktext text-sm">{title}</p>
    </li>
  );
};

// Check Icon Component
const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0-.432.002-.642.005l-.616.017-.299.013-.579.034-.553.046c-4.785.464-6.732 2.411-7.196 7.196l-.046.553-.034.579c-.005.098-.01.198-.013.299l-.017.616-.004.318-.001.324c0 .218.002.432.005.642l.017.616.013.299.034.579.046.553c.464 4.785 2.411 6.732 7.196 7.196l.553.046.579.034c.098.005.198.01.299.013l.616.017.642.005.642-.005.616-.017.299-.013.579-.034.553-.046c4.785-.464 6.732-2.411 7.196-7.196l.046-.553.034-.579c.005-.098.01-.198.013-.299l.017-.616.005-.642-.005-.642-.017-.616-.013-.299-.034-.579-.046-.553c-.464-4.785-2.411-6.732-7.196-7.196l-.553-.046-.579-.034a28.058 28.058 0 0 0-.299-.013l-.616-.017-.318-.004-.324-.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083.094-4 4a1 1 0 0 1-1.32.083l-.094-.083-2-2a1 1 0 0 1 1.32-1.497l.094.083 1.293 1.292 3.293-3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};
