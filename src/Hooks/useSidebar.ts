// hooks/useSidebar.ts
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store";
import { toggleSidebar, setSidebarOpen } from "../Redux/sidebarSlice";

export const useSidebar = () => {
  const { open, animate } = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch<AppDispatch>();

  return {
    open,
    animate,
    toggleSidebar: () => dispatch(toggleSidebar()),
    setOpen: (value: boolean) => dispatch(setSidebarOpen(value)),
  };
};
