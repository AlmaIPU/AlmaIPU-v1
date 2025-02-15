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
      className="flex h-screen bg-gradient-to-tl from-[#2db2e6] to-[#eaf8ff] 
       dark:from-[#0b1a3b] dark:to-[#0b2f5d]"
    >
      <SidebarComponent />

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 ">
        <div className="w-full ml-12 ">
          <div className="text-start">
            <h1 className="font-extrabold text-6xl dark:text-[#E3F4FD] text-[#121C42] font-montserrat">
              Connecting <br />
              <span className="dark:text-[#FFCC04] text-[#2db2e6] font-montserrat">
                GGSIPU
              </span>
              <span className="dark:text-[#E3F4FD] text-[#121C42] font-montserrat">
                {" "}
                Alums
              </span>
            </h1>

            <h1 className="flex items-center justify-start font-normal text-3xl dark:text-[#E3F4FD] text-[#121C42] font-montserrat">
              Reaching MileStone Together
            </h1>

            <div className="flex flex-row gap-4 mt-4 font-montserrat ">
              <button className="rounded-lg font-bold dark:bg-[#FFCC04] bg-[#121C42] p-2 text-[#E3F4FD] dark:text-[#121C42]">
                Connect
              </button>
              <button className="rounded-lg font-bold dark:bg-[#FFCC04] bg-[#121C42] p-2 text-[#E3F4FD] dark:text-[#121C42]">
                Community
              </button>
              <button className="rounded-lg font-bold dark:bg-[#FFCC04] bg-[#121C42] p-2 text-[#E3F4FD] dark:text-[#121C42]">
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
