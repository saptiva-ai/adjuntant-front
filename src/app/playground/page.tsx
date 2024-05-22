"use client"

import Button from "@/components/Button"
import ChatWindow from "@/components/ChatWindow"
import Input from "@/components/Input"
import MailIconOutline from "@/svg/MailIcon/MailIconOutline"
import { Message } from "@/types/message"
import { useState } from "react"

export default function Playground() {
  const [messages, setMessages] = useState<Message[]>([])
  const [query, setQuery] = useState("")

  return (
    <div>
      {/* <ChatWindow
        messages={messages}
        msgLimit={100}
        onMsgLimitExceeded={() => {}}
      >
        <div>s</div>
      </ChatWindow> */}

      <Input
        onValueChange={value => setQuery(value)}
        endContent={
          <MailIconOutline
            className='hover:cursor-pointer'
            isPressedClasses={{
              false: "h-6 w-6",
              true: "h-5 w-5",
            }}
          ></MailIconOutline>
        }
      ></Input>

      <Input
        onValueChange={value => setQuery(value)}
        endContent={
          <Button
            className='hover:cursor-pointer'
            isPressedClasses={{
              false: "h-6 w-6",
              true: "h-5 w-5",
            }}
            size='sm'
            variant='light'
            isIconOnly
            isHoveredChildren={() => (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z' />
              </svg>
            )}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
              />
            </svg>
          </Button>
        }
      ></Input>
    </div>
  )
}
