"use client";
import Link from "next/link";
import { MdVerified as VerifiedIcon } from "react-icons/md";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToogle";
import IntlToggle from "./IntToogle";
import Tooltip from "../../elements/Tooltip";
import Image from "../../elements/Image";
import { cn } from "@/lib/utils";
import LayoutToggleButton from "../LayoutToogleButton";

interface ProfileHeaderProps {
  expandMenu: boolean;
  imageSize: number;
}

const ProfileHeader = ({ expandMenu, imageSize }: ProfileHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full grow items-center gap-4 lg:flex-col lg:gap-0",
        expandMenu && "flex-col !items-start",
      )}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {/* Glow ring animasi */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 0 0px rgba(163,163,163,0.3)",
              "0 0 0 6px rgba(163,163,163,0.08)",
              "0 0 0 0px rgba(163,163,163,0.3)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative"
        >
          <Image
            src="/images/Profile.jpg"
            width={expandMenu ? 72 : imageSize}
            height={expandMenu ? 72 : imageSize}
            alt="Jeffrey Studios"
            className="ring-[1.5px] ring-neutral-200 dark:ring-neutral-700"
            rounded="rounded-full"
          />
          {/* Online dot */}
          <motion.span
            className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400 dark:border-neutral-900 dark:bg-emerald-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Info */}
      <div
        className={cn(
          "flex flex-col lg:mt-5 lg:w-full lg:items-center lg:gap-1",
          expandMenu && "items-start gap-1",
        )}
      >
        {/* Name row */}
        <div className="flex items-center gap-1.5">
          <Link href="/" passHref>
            <motion.h2
              className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 lg:text-base"
              whileHover={{ x: 1 }}
              transition={{ duration: 0.15 }}
            >
              Jeffrey Studios
            </motion.h2>
          </Link>
          <Tooltip title="Verified">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
              transition={{ duration: 0.35 }}
            >
              <VerifiedIcon size={15} className="text-blue-400" />
            </motion.div>
          </Tooltip>
        </div>

        {/* Handle */}
        <motion.span
          className="hidden text-[11px] tracking-wide text-neutral-400 dark:text-neutral-600 lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          @jeffreystudios
        </motion.span>

        {/* Role pill */}
        <motion.div
          className="mt-2 hidden lg:flex"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-medium text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Frontend Developer
          </span>
        </motion.div>
      </div>

      {/* Divider desktop */}
      <motion.div
        className="my-5 hidden h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent dark:via-neutral-800 lg:block"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      />

      {/* Toggles */}
      <motion.div
        className={cn(
          "hidden items-center justify-center gap-1.5 lg:flex",
          expandMenu && "mt-3 flex",
        )}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <IntlToggle />
        <ThemeToggle />
        <div className="mx-0.5 h-4 w-px bg-neutral-200 dark:bg-neutral-800" />
        <LayoutToggleButton />
      </motion.div>
    </div>
  );
};

export default ProfileHeader;