"use client"

import AOS from "aos"
import { useEffect } from "react"

export default function useAOS() {

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true
    })
  }, [])

}