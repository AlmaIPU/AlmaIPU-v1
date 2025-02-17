"use client";
import React, { useState } from "react";
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
import { usePathname } from "next/navigation";
import ProfileForm from "./Profile";

const SidebarComponent = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
      href: "/dashboard",
      icon: <House className="h-5 w-5 flex-shrink-0" />,
      isBottom: false,
    },
    {
      label: "Search",
      href: "/search",
      icon: <Search className="h-5 w-5 flex-shrink-0" />,
      isBottom: false,
    },
    {
      label: "Community",
      href: "/community",
      icon: <Users className="h-5 w-5 flex-shrink-0" />,
      isBottom: false,
    },
    {
      label: "Connection",
      href: "/connection",
      icon: <Handshake className="h-5 w-5 flex-shrink-0" />,
      isBottom: false,
    },
    {
      label: "Catch-Up",
      href: "/catch-up",
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
      href: "/",
      icon: <LogOut className="h-5 w-5 flex-shrink-0" />,
      isBottom: true,
    },
  ];

  const isLinkActive = (href: string) => {
    if (href === "") return false;
    return pathname === href;
  };

  return (
    <>
      <Sidebar>
        <SidebarBody className="justify-between">
          <div className="flex h-full flex-col flex-1 overflow-y-auto overflow-x-hidden font-montserrat font-medium">
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
                      className={`
                      rounded-lg p-2 transition-colors duration-150
                      ${
                        isLinkActive(link.href)
                          ? "bg-[#0A153A] text-[#FFFFFF] dark:bg-[#1B52CC] dark:text-white"
                          : "text-[#0A153A] dark:text-[#FFFFFF] hover:bg-[#0A153A] hover:text-[#FFFFFF] dark:hover:bg-[#1B52CC] "
                      }
                    `}
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
                      className={`
                      rounded-lg p-2 transition-colors duration-150
                      ${
                        isLinkActive(link.href)
                          ? "bg-[#0A153A] text-[#FFFFFF] dark:bg-[#1B52CC] dark:text-white"
                          : "text-[#0A153A] dark:text-[#FFFFFF] hover:bg-[#0A153A] hover:text-[#FFFFFF] dark:hover:bg-[#1B52CC]"
                      }
                    `}
                      onClick={() =>
                        link.label === "Ankit" && setIsProfileOpen(true)
                      }
                    />
                  ))}
              </div>
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <ProfileForm
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
};

export default SidebarComponent;
