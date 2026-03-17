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
      {/* Avatar + status dot */}
      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/images/Profile.jpg"
            width={expandMenu ? 72 : imageSize}
            height={expandMenu ? 72 : imageSize}
            alt="Jeffrey Studios"
            className="ring-2 ring-neutral-200 dark:ring-neutral-700 lg:hover:ring-neutral-400 lg:dark:hover:ring-neutral-500"
            rounded="rounded-full"
          />
        </motion.div>
        {/* Online indicator */}
        <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-green-400 dark:border-neutral-900" />
      </div>

      {/* Name + handle */}
      <div className="flex flex-col items-center gap-0.5 lg:mt-4">
        <div className="flex items-center gap-1.5">
          <Link href="/" passHref>
            <h2 className="text-base font-semibold text-neutral-900 transition-colors hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300 lg:text-lg">
              Jeffrey Studios
            </h2>
          </Link>
          <Tooltip title="Verified">
            <VerifiedIcon size={16} className="text-blue-400" />
          </Tooltip>
        </div>

        <span className="hidden text-xs text-neutral-400 dark:text-neutral-600 lg:block">
          @jeffreystudios
        </span>

        {/* Role badge */}
        {/* <div className="mt-2 hidden lg:block">
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
            Frontend Developer
          </span>
        </div> */}
      </div>

      {/* Divider — desktop only */}
      <div className="my-4 hidden h-px w-full bg-neutral-200 dark:bg-neutral-800 lg:block" />

      {/* Toggles */}
      <div className={cn(
        "hidden items-center justify-center gap-2 lg:flex",
        expandMenu && "mt-2"
      )}>
        <IntlToggle />
        <ThemeToggle />
        <LayoutToggleButton />
      </div>
    </div>
  );
};

export default ProfileHeader;