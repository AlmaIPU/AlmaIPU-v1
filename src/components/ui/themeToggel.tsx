"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { toggleTheme } from "../../Redux/themeSlice";
import { Sun, MoonStar } from "lucide-react";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  if (darkMode === null) return null;

  return (
    <button
      className=""
      onClick={() => {
        dispatch(toggleTheme());
        document.documentElement.classList.toggle("dark");
      }}
    >
      {darkMode ? <Sun /> : <MoonStar />}
    </button>
  );
}
