"use client"

import * as R from "ramda"
import Dropdown from "@/components/Dropdown"
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

  const firstChoice = () => {
    if (R.isEmpty(items)) throw new Error("Item array is empty")

    const firstItem = items.slice(0, 1).map(({ key }) => key)

    return firstItem
  }
  const [selectedKeys, setSelectedKeys] = useState(firstChoice)

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Dropdown
        items={items}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      />
    </main>
  )
}
