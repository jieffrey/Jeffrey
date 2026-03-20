"use client";
import { motion } from "framer-motion";
import { BsGithub, BsInstagram, BsLinkedin, BsEnvelope } from "react-icons/bs";
import { SiTiktok } from "react-icons/si";
import { MdArrowOutward } from "react-icons/md";
import { BiMessageRoundedDetail as ContactIcon } from "react-icons/bi";
import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SubHeading";

const CONTACTS = [
  {
    label: "GitHub",
    handle: "@jeffreykalsah",       // ganti dengan handle lo
    href: "https://github.com/jeffreykalsah",
    icon: <BsGithub size={18} />,
    color: "hover:text-neutral-900 dark:hover:text-neutral-100",
    bg: "hover:bg-neutral-100 dark:hover:bg-neutral-800",
  },
  {
    label: "LinkedIn",
    handle: "Jeffrey Kalsah",
    href: "https://linkedin.com/in/jeffreykalsah",
    icon: <BsLinkedin size={18} />,
    color: "hover:text-blue-600",
    bg: "hover:bg-blue-50 dark:hover:bg-blue-950/30",
  },
  {
    label: "Instagram",
    handle: "@jeffreystudios",
    href: "https://instagram.com/jeffreystudios",
    icon: <BsInstagram size={18} />,
    color: "hover:text-pink-500",
    bg: "hover:bg-pink-50 dark:hover:bg-pink-950/30",
  },
  {
    label: "TikTok",
    handle: "@jeffreystudios",
    href: "https://tiktok.com/@jeffreystudios",
    icon: <SiTiktok size={16} />,
    color: "hover:text-neutral-900 dark:hover:text-neutral-100",
    bg: "hover:bg-neutral-100 dark:hover:bg-neutral-800",
  },
  {
    label: "Email",
    handle: "jeffrey@example.com",  // ganti dengan email lo
    href: "mailto:jeffrey@example.com",
    icon: <BsEnvelope size={18} />,
    color: "hover:text-emerald-600",
    bg: "hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
  },
];

const QuickContact = () => {
  return (
    <section className="space-y-6">
      <div className="space-y-1.5">
        <SectionHeading title="Let's Connect" icon={<ContactIcon size={20} />} />
        <SectionSubHeading>
          <p>Terbuka untuk kolaborasi, diskusi, atau sekedar ngobrol.</p>
        </SectionSubHeading>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {CONTACTS.map((contact, index) => (
          <motion.a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * index, duration: 0.3 }}
            whileHover={{ x: 2 }}
            className={`group flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-600 transition-all duration-200 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 ${contact.color} ${contact.bg}`}
          >
            <div className="flex items-center gap-3">
              <span className="transition-colors duration-200">{contact.icon}</span>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-neutral-400 dark:text-neutral-600">
                  {contact.label}
                </span>
                <span className="text-sm font-medium">{contact.handle}</span>
              </div>
            </div>
            <MdArrowOutward
              size={15}
              className="opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default QuickContact;