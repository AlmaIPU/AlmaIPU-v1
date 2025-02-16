"use client"; // Required for using Redux hooks

import { useSelector } from "react-redux";
import { RootState } from "../Redux/store"; // Adjust the path based on your
import Login from "./Login/page";

export default function Home() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col items-center">
        <Login></Login>
      </div>
    </div>
  );
}
