import { FloatingNav } from "@/components/ui/floating-nav-bar";
import { HomeIcon } from "lucide-react";
import { CiCircleInfo } from "react-icons/ci";
import { FaTasks } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import React from "react";

const NavBar = () => {
  return (
    <FloatingNav
      navItems={[
        { name: "Home", link: "", icon: <HomeIcon className="h-6 w-6" /> },
        { name: "About", link: "#timeline" ,icon: <CiCircleInfo className="h-6 w-6" /> },
        { name: "services", link: "#services"  ,icon: <FaLaptopCode className="h-6 w-6" /> },
        { name: "Projects", link: "#projects"  ,icon: <AiOutlineFundProjectionScreen className="h-6 w-6" /> },
        { name: "Contact", link: "#contact"  ,icon: <CiMail className="h-6 w-6" /> },
      ]}
    ></FloatingNav>
  );
};

export default NavBar;
