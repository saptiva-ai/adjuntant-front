"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

/**
 * @summary Toogles between themes
 * @link https://nextui.org/docs/customization/dark-mode#add-the-theme-switcher
 */
export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div>
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
    </div>
  )
}
