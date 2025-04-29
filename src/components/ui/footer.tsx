import { FaInstagram, FaTiktok, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer2 = () => {
  return (
    <footer className="bg-background text-text py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Side */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">
            &copy; 2024 Seif Basel. All Rights Reserved.
          </p>
        </div>

        {/* Center: Social Media Icons */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a
            href="https://github.com/seifbasel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="w-10 h-10 text-text hover:text-primary  transition-colors" />
          </a>
          <a
            href="https://linkedin.com/in/seif-basel-1a09191b9"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-10 h-10 text-text hover:text-primary transition-colors" />
          </a>
          <a
            href="https://instagram.com/seif.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="w-10 h-10 text-text hover:text-primary  transition-colors" />
          </a>
          <a
            href="https://tiktok.com/@seif__basel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok className="w-10 h-10 text-text hover:text-primary  transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
