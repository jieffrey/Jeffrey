"use client";
import { motion } from "framer-motion";
import Tooltip from "./Tooltip";
import { JSX } from "react";

interface GlassIconProps {
  name: string;
  icon: JSX.Element;
  background: string;
}

const GlassIcon = ({ name, icon, background }: GlassIconProps) => {
  return (
    <Tooltip title={name}>
      <motion.div
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex cursor-pointer items-center justify-center"
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${background} bg-opacity-15 p-2 text-white ring-1 ring-white/10 backdrop-blur-sm dark:bg-opacity-20`}
        >
          {icon}
        </div>
      </motion.div>
    </Tooltip>
  );
};

export default GlassIcon;