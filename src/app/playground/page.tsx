"use client"

import * as R from "ramda"
import { KeyboardEvent, useState } from "react"
import Button from "@/components/Button"
import ChatWindow from "@/components/ChatWindow"
import Input from "@/components/Input"
import MailIconOutline from "@/svg/Mail_Icon/Mail_IconOutline"
import MailIconSolid from "@/svg/Mail_Icon/Mail_IconSolid"
import { Message } from "@/types/message"
import { v4 as uuidv4 } from "uuid"

export default function Playground() {
  const [messages, setMessages] = useState<Message[]>([])
  const [query, setQuery] = useState("")
  const [inputIsDisabled, setInputIsDisabled] = useState(false)
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false)

  const sendMsg = async (text: string) => {
    if (R.isEmpty(text)) return

    setQuery("")

    const newMsg: Message = {
      id: uuidv4(),
      role: "human",
      text,
    }

    setMessages(prevMsgs => [...prevMsgs, newMsg])
  }
  const inputHandleKeyDown = async (
    event: KeyboardEvent<HTMLInputElement> | KeyboardEvent,
  ) => {
    switch (event.key) {
      case "Enter":
        await sendMsg(query)
        break

      default:
        break
    }
  }
  const buttonOnClick = async () => {
    if (inputIsDisabled || buttonIsDisabled) return

    await sendMsg(query)
  }

  return (
    <>
      <ChatWindow
        messages={messages}
        msgLimit={2}
        onMsgLimitExceeded={() => {
          setInputIsDisabled(false)
          setButtonIsDisabled(true)
        }}
        msgLimitExceededChildren={() => <div>s</div>}

      ></ChatWindow>

      <Input
        onValueChange={value => setQuery(value)}
        onKeyDown={inputHandleKeyDown}
        value={query}
        disabled={inputIsDisabled}
        endContent={
          <Button
            className='hover:cursor-pointer data-[disabled=true]:opacity-25'
            isPressedClasses={{
              false: "h-6 w-6",
              true: "h-5 w-5",
            }}
            size='sm'
            variant='light'
            isIconOnly
            isHoveredChildren={() => <MailIconSolid />}
            onClick={buttonOnClick}
            isDisabled={true}
            isDisabledClass="opacity-80"
          >
            <MailIconOutline />
          </Button>
        }
      ></Input>
    </>
  )
}
