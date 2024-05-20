import ChatWindow from "@/components/ChatWindow"
import React from "react"
import cslx from "clsx"

export default function App() {
  const className = cslx(
    "list-disc space-y-3 pl-5 text-slate-400 marker:text-sky-400",
  )

  return (
    <ChatWindow></ChatWindow>
  )
}
