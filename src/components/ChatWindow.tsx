import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react"

import React from "react"

export default function ChatWindow() {
  const arr = new Array(50).fill(0)
  return (
    <Card className='flex h-96 w-96 flex-col gap-1 overflow-auto overscroll-contain bg-gray-700/80 scrollbar scrollbar-track-gray-200 scrollbar-thumb-sky-700 hover:scrollbar-thumb-sky-500 active:scrollbar-thumb-sky-400'>
      {arr.map((val, idx) => (
        <CardHeader key={idx}>
          <div className='flex gap-1'>
            <Avatar
              isBordered
              showFallback
              radius='full'
              size='sm'
              src='https://nextui.org/avatars/avatar-1.png'
            />
            <p className='pt-1.5 text-small font-light leading-none text-default-600'>
              Zoey Lang
            </p>
          </div>
        </CardHeader>
      ))}
    </Card>
  )
}
