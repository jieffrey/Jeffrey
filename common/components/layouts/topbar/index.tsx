"use client"

import Link from "next/link"
import { useState } from "react"
import { useSelectedLayoutSegment } from "next/navigation"
import { useLayout } from "@/common/stores/layout"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { MdVerified as VerifiedIcon } from "react-icons/md"
import { TbLayoutSidebar as SidebarIcon } from "react-icons/tb"
import { BiGlobe } from "react-icons/bi"
import { cn } from "@/lib/utils"

import { GROUPS, SOCIAL_LINKS } from "@/common/constants/topbar"

const NavGroup = ({
  group,
  pathname,
  t,
}: any) => {
  const [open, setOpen] = useState(false)
  const isActive = group.items.some((item: any) => pathname === item.href)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        className={cn(
          "p-2 rounded-lg",
          isActive ? "bg-neutral-200 dark:bg-neutral-800" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
        )}
      >
        {group.icon}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute left-1/2 top-full mt-2 w-40 -translate-x-1/2 rounded-xl border bg-white dark:bg-neutral-900 p-2 shadow-lg"
          >
            {group.items.map((item: any) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                {t(item.title)}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Topbar() {
  const { toggleMode } = useLayout()
  const t = useTranslations("Navigation")
  const [socialOpen, setSocialOpen] = useState(false)

  const segment = useSelectedLayoutSegment()
  const pathname = segment ? `/${segment}` : "/"

  return (
    <header className="sticky top-0 z-20 border-b bg-neutral-50/80 backdrop-blur dark:bg-neutral-900/80">
      <div className="mx-auto flex max-w-7xl items-center px-6 py-4 gap-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span className="font-semibold">Jeffrey Studios</span>
          <VerifiedIcon size={13} className="text-blue-400" />
        </Link>

        <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />

        {/* NAV */}
        <nav className="flex flex-1 items-center gap-1">

          {GROUPS.map((group) => (
            <NavGroup key={group.id} group={group} pathname={pathname} t={t} />
          ))}

          {/* SOCIAL */}
          <div
            className="relative"
            onMouseEnter={() => setSocialOpen(true)}
            onMouseLeave={() => setSocialOpen(false)}
          >
            <BiGlobe size={18}/>

            <AnimatePresence>
              {socialOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute left-1/2 top-full mt-2 w-40 -translate-x-1/2 rounded-xl border bg-white dark:bg-neutral-900 p-2 shadow-lg"
                >
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      {social.icon}
                      {social.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </nav>

        {/* RIGHT */}
        <button onClick={toggleMode} className="p-2">
          <SidebarIcon size={18}/>
        </button>

      </div>
    </header>
  )
}