import Dropdown from "@/components/Dropdown"
import Image from "next/image"
import ThemeSwitcher from "@/components/ThemeSwitcher"
import { useState } from "react"

export default function Home() {
  const items = [
    {
      key: "new",
      label: "New file",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    },
  ]

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Dropdown items={items}/>
    </main>
  )
}
