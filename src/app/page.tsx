import Dropdown from "@/components/Dropdown"
import Image from "next/image"
import ThemeSwitcher from "@/components/ThemeSwitcher"

export default function Home() {
  const items = [
    {
      id: "new",
      label: "New file",
    },
    {
      id: "copy",
      label: "Copy link",
    },
    {
      id: "edit",
      label: "Edit file",
    },
    {
      id: "delete",
      label: "Delete file",
    },
  ]

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <ThemeSwitcher/>
      <Dropdown items={items}/>
    </main>
  )
}
