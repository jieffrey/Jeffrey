"use client";
import Link from "next/link";
import { MdVerified as VerifiedIcon } from "react-icons/md";
import ThemeToggle from "./ThemeToogle";
import IntlToggle from "./IntToogle";
import Tooltip from "../../elements/Tooltip";
import Image from "../../elements/Image";
import { cn } from "@/lib/utils";

interface ProfileHeaderProps {
  expandMenu: boolean;
  imageSize: number;
}

const ProfileHeader = ({ expandMenu, imageSize }: ProfileHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full grow items-center gap-4 lg:flex-col lg:gap-0.5",
        expandMenu && "flex-col !items-start",
      )}
    >
      <Image
        src="/images/profile.jpg"
        width={expandMenu ? 80 : imageSize}
        height={expandMenu ? 80 : imageSize}
        alt="Jeffrey Studios"
        className="border-2 border-neutral-400 dark:border-neutral-600 lg:hover:scale-105"
        rounded="rounded-full"
      />

      <div className="mt-1 flex items-center gap-2 lg:mt-4">
        <Link href="/" passHref>
          <h2 className="grow text-lg font-medium lg:text-xl">
            Jeffrey Studios
          </h2>
        </Link>
        <Tooltip title="Verified">
          <VerifiedIcon size={18} className="text-blue-400" />
        </Tooltip>
      </div>

      <div className="hidden text-sm text-neutral-600 transition-all duration-300 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-400 lg:flex">
        @jeffreystudios
      </div>

      <div className="hidden justify-between gap-6 lg:mt-4 lg:flex">
        <IntlToggle />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default ProfileHeader;