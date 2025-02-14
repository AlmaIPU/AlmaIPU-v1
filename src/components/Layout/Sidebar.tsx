"use client";
import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sideBarComponent";
import {
  Search,
  House,
  Users,
  Handshake,
  MessageCircleMore,
  CircleUser,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import LogoDark from "../../Assets/Logo/LogoDark.png";
import LogoLight from "../../Assets/Logo/LogoLight.png";
import ThemeToggle from "../ui/themeToggel";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const SidebarComponent = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const AlmaIPU = () => (
    <Image
      alt="Logo"
      src={darkMode ? LogoDark : LogoLight}
      width={70}
      height={70}
      className="px-1 mb-6"
    />
  );

  const links = [
    {
      label: "Home",
      href: "",
      icon: <House className="h-5 w-5 flex-shrink-0" />,
      isBottom: false,
    },
    {
      label: "Search",
      href: "",
      icon: <Search className="h-5 w-5 flex-shrink-0" />,
      isBottom: false,
    },
    {
      label: "Community",
      href: "",
      icon: <Users className="h-5 w-5 flex-shrink-0" />,
      isBottom: false,
    },
    {
      label: "Connection",
      href: "",
      icon: <Handshake className="h-5 w-5 flex-shrink-0" />,
      isBottom: false,
    },
    {
      label: "Catch-Up",
      href: "",
      icon: <MessageCircleMore className="h-5 w-5 flex-shrink-0" />,
      isBottom: false,
    },
    {
      label: "Theme",
      href: "",
      icon: <ThemeToggle />,
      isBottom: true,
    },
    {
      label: "Ankit",
      href: "",
      icon: <CircleUser className="h-5 w-5 flex-shrink-0" />,
      isBottom: true,
    },
    {
      label: "LogOut",
      href: "/Login",
      icon: <LogOut className="h-5 w-5 flex-shrink-0" />,
      isBottom: true,
    },
  ];

  return (
    <Sidebar>
      <SidebarBody className="justify-between">
        <div className="flex h-full flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <AlmaIPU />
          <div className="flex h-full flex-col">
            {/* Top Links */}
            <div className="flex flex-col gap-2">
              {links
                .filter((link) => !link.isBottom)
                .map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={link}
                    className="hover:bg-[#121C42] text-[#121C42] rounded-lg p-2 hover:text-[#FFFFFF]"
                  />
                ))}
            </div>

            {/* Bottom Links */}
            <div className="mt-auto flex flex-col gap-2 mb-2">
              {links
                .filter((link) => link.isBottom)
                .map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={link}
                    className="hover:bg-[#121C42] text-[#121C42] rounded-lg p-2 hover:text-[#FFFFFF]"
                  />
                ))}
            </div>
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export default SidebarComponent;
