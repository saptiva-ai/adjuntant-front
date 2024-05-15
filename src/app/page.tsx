import Image from "next/image"
import ThemeSwitcher from "@/components/ThemeSwitcher"

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <ThemeSwitcher></ThemeSwitcher>
      <div className='bg-purple-900 text-black dark:bg-gray-800 dark:text-white'>
        ...
        <div>Text color changes based on theme</div>
      </div>
    </main>
  )
}
