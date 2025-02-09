import { createSlice } from "@reduxjs/toolkit";

type ThemeState = {
  darkMode: boolean | null;
};

const initialState: ThemeState = {
  darkMode: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.darkMode = action.payload;
    },
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
      }
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
