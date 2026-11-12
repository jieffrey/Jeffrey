"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BiMessageRoundedDetail as ContactIcon } from "react-icons/bi";
import { MdArrowOutward, MdOutlineSend } from "react-icons/md";
import {
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsEnvelope,
  BsDiscord,
  BsTelegram,
  BsCheckCircle,
} from "react-icons/bs";
import { SiTiktok } from "react-icons/si";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SubHeading";
import { cn } from "@/lib/utils";

type ContactItem = {
  label: string;
  handle: string;
  href: string;
  icon: React.ReactNode;
  borderHover: string;
  iconHover: string;
  description: string;
};

const CONTACTS: ContactItem[] = [
  {
    label: "GitHub",
    handle: "jieffrey",
    href: "https://github.com/jieffrey",
    icon: <BsGithub size={18} />,
    borderHover: "hover:border-neutral-500 dark:hover:border-neutral-500",
    iconHover: "group-hover:text-neutral-900 dark:group-hover:text-neutral-100",
    description: "Source code & projects",
  },
  {
    label: "LinkedIn",
    handle: "Jeffrey Kalsah",
    href: "https://www.linkedin.com/in/jeffrey-kalsah-alkautsar-9abb1b394",
    icon: <BsLinkedin size={18} />,
    borderHover: "hover:border-blue-400 dark:hover:border-blue-600",
    iconHover: "group-hover:text-blue-600",
    description: "Professional network",
  },
  {
    label: "Instagram",
    handle: "@jklshhh",
    href: "https://www.instagram.com/jklshhh",
    icon: <BsInstagram size={18} />,
    borderHover: "hover:border-pink-400 dark:hover:border-pink-600",
    iconHover: "group-hover:text-pink-500",
    description: "Photos & daily life",
  },
  {
    label: "TikTok",
    handle: "@jieffreyyyy",
    href: "https://www.tiktok.com/@jieffreyyyy",
    icon: <SiTiktok size={16} />,
    borderHover: "hover:border-neutral-500 dark:hover:border-neutral-500",
    iconHover: "group-hover:text-neutral-900 dark:group-hover:text-neutral-100",
    description: "Short videos & content",
  },
  {
    label: "Telegram",
    handle: "@jeffreykalsah",
    href: "https://t.me/jeffreykalsah",
    icon: <BsTelegram size={18} />,
    borderHover: "hover:border-sky-400 dark:hover:border-sky-600",
    iconHover: "group-hover:text-sky-500",
    description: "Quick chat",
  },
  {
    label: "Discord",
    handle: "jieffrey",
    href: "https://discord.com/users/867263933742972958",
    icon: <BsDiscord size={18} />,
    borderHover: "hover:border-indigo-400 dark:hover:border-indigo-600",
    iconHover: "group-hover:text-indigo-500",
    description: "Gaming & community",
  },
];

type FormState = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const t = useTranslations("ContactPage");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();
      setFormState("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setFormState("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all duration-200 focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-600 dark:focus:border-neutral-600";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <SectionHeading title={t("title")} icon={<ContactIcon size={20} />} />
        <SectionSubHeading>
          <p>{t("subtitle")}</p>
        </SectionSubHeading>
      </div>

      {/* ── CONTACT GRID ── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

        {/* Email — full width */}
        <motion.a
          href="mailto:kalsahalkautsar@gmail.com"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ x: 2 }}
          className="group col-span-1 flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 p-5 transition-all duration-200 hover:border-emerald-400 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-emerald-600 sm:col-span-2"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-500 transition-all duration-200 group-hover:text-emerald-600 dark:border-neutral-700 dark:bg-neutral-800">
              <BsEnvelope size={22} />
            </div>
            <div>
              <span className="text-xs font-medium text-neutral-400 dark:text-neutral-600">
                Email
              </span>
              <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                kalsahalkautsar@gmail.com
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-600">
                {t("email_desc")}
              </p>
            </div>
          </div>
          <MdArrowOutward
            size={18}
            className="shrink-0 text-neutral-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-500 dark:text-neutral-700"
          />
        </motion.a>

        {/* Other contacts — 2 col */}
        {CONTACTS.map((contact, index) => (
          <motion.a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * (index + 1), duration: 0.3 }}
            whileHover={{ x: 2 }}
            className={cn(
              "group flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 p-4 transition-all duration-200 dark:border-neutral-800 dark:bg-neutral-900",
              contact.borderHover
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-500 transition-all duration-200 dark:border-neutral-700 dark:bg-neutral-800",
                  contact.iconHover
                )}
              >
                {contact.icon}
              </div>
              <div>
                <span className="text-xs font-medium text-neutral-400 dark:text-neutral-600">
                  {contact.label}
                </span>
                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  {contact.handle}
                </p>
                <p className="text-xs text-neutral-400 dark:text-neutral-600">
                  {contact.description}
                </p>
              </div>
            </div>
            <MdArrowOutward
              size={15}
              className="shrink-0 text-neutral-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-500 dark:text-neutral-700 dark:group-hover:text-neutral-400"
            />
          </motion.a>
        ))}
      </div>

      {/* ── CONTACT FORM ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div className="mb-4 space-y-0.5">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {t("Or send me a message")}
          </h3>
        </div>

        {formState === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-2 py-8 text-center"
          >
            <BsCheckCircle size={32} className="text-emerald-500" />
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {t("form_success")}
            </p>
            <p className="text-xs text-neutral-400">{t("form_success_sub")}</p>
            <button
              onClick={() => setFormState("idle")}
              className="mt-2 text-xs text-neutral-400 underline hover:text-neutral-600 dark:hover:text-neutral-300"
            >
              {t("form_send_another")}
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-500">
                  {t("name")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("form_name_placeholder")}
                  required
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-500">
                  {t("form_email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("form_email_placeholder")}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-500">
                {t("form_message")}
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t("form_message_placeholder")}
                required
                rows={4}
                className={cn(inputClass, "resize-none")}
              />
            </div>

            {formState === "error" && (
              <p className="text-xs text-red-500">{t("form_error")}</p>
            )}

            <button
              type="submit"
              disabled={formState === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-neutral-700 disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
            >
              {formState === "loading" ? (
                <>
                  <AiOutlineLoading3Quarters size={14} className="animate-spin" />
                  {t("form_sending")}
                </>
              ) : (
                <>
                  <MdOutlineSend size={15} />
                  {t("form_send")}
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>

      <p className="text-center text-xs text-neutral-400 dark:text-neutral-600">
        {t("footer_note")}
      </p>
    </div>
  );
};

export default Contact;