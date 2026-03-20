import { BiUser, BiCollection, BiCategory } from "react-icons/bi"
import { BsGithub, BsInstagram, BsTiktok, BsTwitterX } from "react-icons/bs"

export const GROUPS = [
  {
    id: "personal",
    icon: <BiUser size={18} />,
    items: [
      { title: "About", href: "/about" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    id: "work",
    icon: <BiCollection size={18} />,
    items: [
      { title: "Projects", href: "/projects" },
      { title: "Achievements", href: "/achievements" },
    ],
  },
  {
    id: "stats",
    icon: <BiCategory size={18} />,
    items: [
      { title: "Dashboard", href: "/dashboard" },
    ],
  },
]

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/jeffreystudios",
    icon: <BsGithub size={16} />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/jeffreystudios",
    icon: <BsInstagram size={16} />,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@jeffreystudios",
    icon: <BsTiktok size={16} />,
  },
  {
    label: "Twitter",
    href: "https://x.com/jeffreystudios",
    icon: <BsTwitterX size={16} />,
  },
]