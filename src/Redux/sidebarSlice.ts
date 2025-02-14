// store/sidebarSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  open: boolean;
  animate: boolean;
}

const initialState: SidebarState = {
  open: false,
  animate: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.open = !state.open;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setAnimate: (state, action: PayloadAction<boolean>) => {
      state.animate = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setAnimate } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
