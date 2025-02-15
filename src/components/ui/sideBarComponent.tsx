import { cn } from "../../lib/utils";
import Link from "next/link";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSidebar } from "../../Hooks/useSidebar";
import { useDispatch } from "react-redux";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { toggleTheme } from "../../Redux/themeSlice";

interface Links {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarLinkProps {
  link: Links;
  className?: string;
  onClick?: () => void;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({
  link,
  className,
  onClick,
  ...props
}) => {
  const { open, animate } = useSidebar();
  const dispatch = useDispatch();
  const isThemeToggle = link.label === "Theme";

  const handleClick = (e: React.MouseEvent) => {
    if (isThemeToggle) {
      e.preventDefault();
      dispatch(toggleTheme());
      document.documentElement.classList.toggle("dark");
    }
    if (onClick) onClick();
  };

  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2 group py-2 transition-colors duration-150",
        "rounded-lg p-2",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <div className="group-hover:text-[#FFFFFF] dark:group-hover:text-[#121C42] dark:text-white transition-colors duration-150">
        {link.icon}
      </div>
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-sm whitespace-pre inline-block !p-0 !m-0 transition-colors duration-150 group-hover:text-[#FFFFFF] dark:group-hover:text-[#121C42] dark:text-white"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar(); // usesidebar hook
  return (
    <motion.div
      className={cn(
        "h-screen px-4 py-4 bg-[#2db2e6] dark:bg-[#121C42] flex-shrink-0",
        className
      )}
      animate={{
        width: animate ? (open ? "250px" : "70px") : "250px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, toggleSidebar } = useSidebar();
  return (
    <div
      className={cn(
        "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-[#121C42] w-full"
      )}
      {...props}
    >
      <div className="flex justify-end z-20 w-full">
        <IconMenu2 className="text-[#121C42] " onClick={toggleSidebar} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "fixed h-full w-full inset-0 bg-[#FFFFFF] p-10 z-[100] flex flex-col justify-between",
              className
            )}
          >
            <div
              className="absolute right-10 top-10 z-50 text-[#121C42] "
              onClick={toggleSidebar}
            >
              <IconX />
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
