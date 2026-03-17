"use client"

import { ReactNode } from "react"
import Sidebar from "./sidebar"
import useAOS from "@/hooks/use-aos"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  
  useAOS()
  return (
<div className="flex justify-center">

      <div className="flex w-full max-w-350">

        <Sidebar />

        <main className="flex-1 px-10 py-10">
          {children}
        </main>

      </div>

    </div>
  )
}