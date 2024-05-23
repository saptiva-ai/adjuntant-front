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
  cardClasses?: string
  msgClasses?: string
  aiProfilePicUrl: string
}

export default function AiChatWindow({
  messages,
  msgLimit = Infinity,
  onMsgLimitExceeded = () => null,
  msgLimitExceededChildren = () => null,
  topCardHeaderChildren = () => null,
  cardClasses,
  msgClasses,
  aiProfilePicUrl,
}: ChatWindowProps) {
  if (msgLimit !== Infinity && !isEven(msgLimit))
    throw new Error("msgLimit must be an even number")

  const msgsExists = messages.length > 0
  const msgLimitExceeded = messages.length >= msgLimit

  useEffect(() => {
    if (msgLimitExceeded) onMsgLimitExceeded()
  }, [msgLimitExceeded, onMsgLimitExceeded])

  return (
    <Card className={cardClasses}>
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
                src={msg.role === "ai" ? aiProfilePicUrl : undefined}
              />
              <p className={msgClasses}>{msg.text}</p>
            </div>
          </CardHeader>
        ))}

      {msgLimitExceeded && msgLimitExceededChildren()}
    </Card>
  )
}
