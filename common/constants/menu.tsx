import {
  Home,
  User,
  Folder,
  Trophy,
  Mail
} from "lucide-react"

export const MENU_ITEMS = [
  {
    title: "Home",
    href: "/",
    icon: <Home size={18} />,
    isShow: true
  },
  {
    title: "About",
    href: "/about",
    icon: <User size={18} />,
    isShow: true
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <Folder size={18} />,
    isShow: true
  },
  {
    title: "Achievements",
    href: "/achievements",
    icon: <Trophy size={18} />,
    isShow: true
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <Mail size={18} />,
    isShow: true
  }
]