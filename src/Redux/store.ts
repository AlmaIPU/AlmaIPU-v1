import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import sidebarReducer from "./sidebarSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: sidebarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
