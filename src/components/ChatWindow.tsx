"use client"

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react"
import { Message } from "@/types/message"

type ChatWindowProps = {
  messages: Message[]
  msgLimit: number
  onMsgLimitExceeded: (...args: any[]) => void
  children: React.ReactNode
}

export default function ChatWindow({
  messages,
  msgLimit,
  onMsgLimitExceeded,
  children,
}: ChatWindowProps) {
  const msgLimitExceeded = messages.length > msgLimit
  const msgsExists = messages.length > 0

  if (msgLimitExceeded) onMsgLimitExceeded()

  return (
    <Card className='flex h-96 w-96 flex-col gap-1 overflow-auto overscroll-contain bg-gray-700/80 scrollbar scrollbar-track-gray-200 scrollbar-thumb-green-700 hover:scrollbar-thumb-green-500 active:scrollbar-thumb-green-400'>
      <CardHeader>
        <div className='flex gap-1'>
          <Avatar
            isBordered
            showFallback
            radius='full'
            size='sm'
            src='https://nextui.org/avatars/avatar-1.png'
          />
          <p className='pt-1.5 text-small font-light leading-none text-default-600'>
            ¿Como puedo ayudarte hoy?
          </p>
        </div>
      </CardHeader>

      {msgsExists &&
        messages.map(msg => (
          <CardHeader key={msg.id}>
            <div className='flex gap-1'>
              <Avatar
                isBordered
                showFallback
                radius='full'
                size='sm'
                src='https://nextui.org/avatars/avatar-1.png'
              />
              <p className='pt-1.5 text-small font-light leading-none text-default-600'>
                {msg.text}
              </p>
            </div>
          </CardHeader>
        ))}

      {msgLimitExceeded && children}
    </Card>
  )
}
