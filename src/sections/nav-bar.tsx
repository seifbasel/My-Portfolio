import { FloatingNav } from "@/components/ui/floating-nav-bar";
import { HomeIcon } from "lucide-react";
import React from "react";

const NavBar = () => {
  return (
    <FloatingNav
      navItems={[
        { name: "Home", link: "", icon: <HomeIcon className="h-6 w-6" /> },
        { name: "About", link: "#timeline" },
        { name: "services", link: "#services" },
        { name: "Projects", link: "#projects" },
        { name: "Contact", link: "#contact" },
      ]}
    ></FloatingNav>
  );
};

export default NavBar;
