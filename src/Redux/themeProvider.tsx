"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { setTheme } from "./themeSlice";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true";
    dispatch(setTheme(savedTheme)); // Set Redux state after mounting

    document.documentElement.classList.toggle("dark", savedTheme);
  }, [dispatch]);

  return <>{darkMode !== null ? children : null}</>; // Prevent initial mismatch
}
