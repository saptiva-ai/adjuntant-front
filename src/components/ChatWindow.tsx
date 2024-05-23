"use client"

import { Avatar, Card, CardHeader } from "@nextui-org/react"
import { Message } from "@/types/message"
import isEven from "@/util/isEven"
import { useEffect } from "react"

type ChatWindowProps = {
  messages: Message[]
  msgLimit?: number
  onMsgLimitExceeded?: (...args: any[]) => void
  topCardHeaderChildren?: () => React.ReactNode
  msgLimitExceededChildren?: () => React.ReactNode
}

export default function ChatWindow({
  messages,
  msgLimit = Infinity,
  onMsgLimitExceeded = () => null,
  msgLimitExceededChildren = () => null,
  topCardHeaderChildren = () => null,
}: ChatWindowProps) {
  if (msgLimit !== Infinity && !isEven(msgLimit))
    throw new Error("msgLimit must be an even number")

  const msgsExists = messages.length > 0
  const msgLimitExceeded = messages.length >= msgLimit

  useEffect(() => {
    if (msgLimitExceeded) onMsgLimitExceeded()
  }, [msgLimitExceeded, onMsgLimitExceeded])

  return (
    <Card className='flex h-96 w-96 flex-col gap-1 overflow-auto overscroll-contain bg-gray-700/80 scrollbar scrollbar-track-gray-200 scrollbar-thumb-green-700 hover:scrollbar-thumb-green-500 active:scrollbar-thumb-green-400'>
      {topCardHeaderChildren()}

      {msgsExists &&
        messages.map(msg => (
          <CardHeader key={msg.id}>
            <div className='flex gap-1'>
              <Avatar
                isBordered
                showFallback
                radius='full'
                size='sm'
                src={msg.role === "ai" ? "/img/logoVA.webp" : undefined}
              />
              <p className='pt-1.5 text-small font-light leading-none text-default-600'>
                {msg.text}
              </p>
            </div>
          </CardHeader>
        ))}

      {msgLimitExceeded && msgLimitExceededChildren()}
    </Card>
  )
}
