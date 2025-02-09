"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { toggleTheme } from "../../Redux/themeSlice";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  if (darkMode === null) return null; // Hide button until theme is set

  return (
    <button
      className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
      onClick={() => {
        dispatch(toggleTheme());
        document.documentElement.classList.toggle("dark");
      }}
    >
      {darkMode ? "🌙 Dark Mode" : "🌞 Light Mode"}
    </button>
  );
}
