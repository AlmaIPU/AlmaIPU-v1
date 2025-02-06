import { createSlice } from "@reduxjs/toolkit";

type ThemeState = {
  darkMode: boolean;
};

const initialState: ThemeState = {
  darkMode: false, // Default theme is light
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode; // Toggle between dark and light mode
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const { toggleTheme, setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
