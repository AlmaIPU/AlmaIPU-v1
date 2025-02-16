"use client";
import React from "react";
import SidebarComponent from "@/components/Layout/Sidebar";
import Image from "next/image";
import darkHomeImage from "../../Assets/Images/DarkMode-Home-01[1].png";
import LightHomeImage from "../../Assets/Images/LightMode-Home-01[1].png";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

const Dashboard = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const HomeImage = () => (
    <Image
      alt="Logo"
      src={darkMode ? darkHomeImage : LightHomeImage}
      width={1000}
      height={1000}
      className="max-w-full max-h-full object-cover rounded-2xl p-4"
    />
  );

  return (
    <div
      className="flex h-screen bg-gradient-to-tl from-[#88C4FF] to-[#DCEAFF] 
       dark:from-[#0B1635] dark:to-[#0B3363]"
    >
      <SidebarComponent />

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 ">
        <div className="w-full ml-12 ">
          <div className="text-start">
            <h1 className="font-extrabold text-6xl dark:text-[#E9F6FD] text-[#0A153A] font-montserrat">
              Connecting <br />
              <span className="dark:text-[#FFCB04] text-[#1BB3EF] font-montserrat">
                GGSIPU
              </span>
              <span className="dark:text-[#E9F6FD] text-[#0A153A] font-montserrat">
                {" "}
                Alums
              </span>
            </h1>

            <h1 className="flex items-center justify-start font-normal text-3xl dark:text-[#E9F6FD] text-[#0A153A] font-montserrat">
              Reaching MileStone Together
            </h1>

            <div className="flex flex-row gap-4 mt-4 font-montserrat ">
              <button className="rounded-lg font-bold dark:bg-[#FFCB04] bg-[#121C42] p-2 text-[#E3F4FD] dark:text-[#0A153A]">
                Connect
              </button>
              <button className="rounded-lg font-bold dark:bg-[#FFCB04] bg-[#0A153A] p-2 text-[#E3F4FD] dark:text-[#0A153A]">
                Community
              </button>
              <button className="rounded-lg font-bold dark:bg-[#FFCB04] bg-[#0A153A] p-2 text-[#E3F4FD] dark:text-[#121C42]">
                Chat App
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-1/2">
        <div className="relative w-full h-full flex items-center justify-center mr-24">
          <HomeImage></HomeImage>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
