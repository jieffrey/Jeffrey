"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuType } from "./types"

export default function MenuItem({
  title,
  href,
  icon
}: MenuType) {

  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`
      flex items-center gap-3 px-4 py-2 rounded-xl transition-all
      ${isActive
        ? "bg-neutral-200 dark:bg-neutral-800"
        : "hover:bg-neutral-100 dark:hover:bg-neutral-900"}
      `}
    >
      {icon}
      <span>{title}</span>
    </Link>
  )
}