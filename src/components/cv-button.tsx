import { DownloadIcon } from "lucide-react";
import { motion } from "framer-motion";

const DownloadCVButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.5,
        duration: 0.5,
        ease: "easeOut",
      }}
      className="mt-10"
    >
      <a
        href="/seif-cv.pdf"
        download="seif-cv.pdf"
        className="group relative inline-block"
        aria-label="Download Seif's CV"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/60 rounded-lg blur-md opacity-60 group-hover:opacity-90 transition duration-300"></div>
        <div className="relative flex items-center md:text-3xl gap-5 px-20 py-5 bg-background border border-primary/30 text-text rounded-lg group-hover:shadow-lg group-hover:shadow-primary/30 transition duration-300">
          Download CV
          <DownloadIcon className="w-5 h-5" />
        </div>
      </a>
    </motion.div>
  );
};
export default DownloadCVButton;
