"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  MdDarkMode as DarkModeIcon,
  MdLightMode as LightModeIcon,
} from "react-icons/md";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Placeholder biar layout gak shift saat SSR
  if (!mounted) {
    return (
      <div className="h-10 w-[88px] rounded-full border-[1.5px] border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800" />
    );
  }

  const isLightMode = resolvedTheme === "light";

  return (
    <div className="flex items-center justify-center">
      {/* Desktop — sliding toggle */}
      <div className="relative hidden items-center gap-2 rounded-full border-[1.5px] border-neutral-300 bg-neutral-100 p-1 dark:border-neutral-700 dark:bg-neutral-800 lg:flex">
        <motion.div
          className="absolute bottom-1 top-1 w-8 rounded-full bg-neutral-300 dark:bg-neutral-700"
          animate={{ x: isLightMode ? 0 : 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <motion.button
          className="relative z-10 flex h-8 w-8 items-center justify-center transition duration-200"
          onClick={() => setTheme("light")}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className={`
    transition-colors duration-200
    ${isLightMode
                ? "text-white"
                : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"}
  `}
          >
            <LightModeIcon size={17} />
          </motion.div>
        </motion.button>
        <motion.button
          className="relative z-10 flex h-8 w-8 items-center justify-center transition duration-200"
          onClick={() => setTheme("dark")}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className={`
    transition-colors duration-200
    ${!isLightMode
                ? "text-white"
                : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"}
  `}
          >
            <DarkModeIcon size={17} />
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile — single toggle button */}
      <button
        className="flex items-center gap-2 rounded-full border-[1.5px] border-neutral-300 bg-neutral-100 p-1 transition duration-200 hover:scale-110 dark:border-neutral-700 dark:bg-neutral-800 lg:hidden"
        onClick={() => setTheme(isLightMode ? "dark" : "light")}
      >
        <motion.div
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-300 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-50"
        >
          {isLightMode ? <DarkModeIcon size={17} /> : <LightModeIcon size={17} />}
        </motion.div>
      </button>
    </div>
  );
};

export default ThemeToggle;