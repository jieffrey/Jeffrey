"use client";
import dynamic from "next/dynamic";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useLayout } from "@/common/stores/layout";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

const Notif = dynamic(() => import("../elements/Notif"), { ssr: false });

interface LayoutsProps {
  children: React.ReactNode;
}

const Layouts = ({ children }: LayoutsProps) => {
  const { mode } = useLayout();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  if (mode === "topbar") {
    return (
      <div className="min-h-screen">
        <Topbar />
        <main className="mx-auto max-w-7xl px-6 py-6">
          {children}
        </main>
        <Notif />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl lg:px-12">
      <div className="mx-auto flex flex-col lg:flex-row lg:gap-5 lg:py-4">
        <Sidebar />
        <main className="max-w-213.5 transition-all duration-300 lg:w-4/5">
          {children}
        </main>
      </div>
      <Notif />
    </div>
  );
};

export default Layouts;