"use client"

import * as R from "ramda"
import { Avatar, Card, CardFooter, CardHeader } from "@nextui-org/react"
import { KeyboardEvent, useState } from "react"
import AiChatWindow from "@/components/AiChatWindow"
import Button from "@/components/Button"
import Dropdown from "@/components/Dropdown"
import Input from "@/components/Input"
import MailIconOutline from "@/svg/Mail_Icon/Mail_IconOutline"
import MailIconSolid from "@/svg/Mail_Icon/Mail_IconSolid"
import { Message } from "@/types/message"
import Slider from "@/components/Slider"
import { v4 as uuidv4 } from "uuid"

export default function Playground() {
  const [messages, setMessages] = useState<Message[]>([])
  const [query, setQuery] = useState("")
  const [inputIsDisabled, setInputIsDisabled] = useState(false)
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false)
  const dropdownItems = [
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
  const firstDropdownChoice = () => {
    const firstItem = dropdownItems.slice(0, 1).map(({ key }) => key)

    return firstItem
  }
  const [selectedKeys, setSelectedKeys] = useState(firstDropdownChoice)

  const sendMsg = async (text: string) => {
    if (inputIsDisabled || buttonIsDisabled) return
    if (R.isEmpty(text)) return

    setQuery("")

    const fakeAiResponse: Message = {
      id: uuidv4(),
      role: "ai",
      text: "Some fake response",
    }

    const newMsg: Message = {
      id: uuidv4(),
      role: "human",
      text,
    }

    setMessages(prevMsgs => [...prevMsgs, newMsg, fakeAiResponse])
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
  const chatWindowOnMsgLmtExceeded = () => {
    setInputIsDisabled(true)
    setButtonIsDisabled(true)
  }

  return (
    <div className='grid h-screen lg:grid-cols-5 lg:gap-2 lg:p-1'>
      <div className='flex flex-col gap-2 p-1 lg:col-span-4'>
        <AiChatWindow
          cardClasses='flex flex-col gap-1 overflow-auto overscroll-contain bg-gray-700/80 scrollbar scrollbar-track-gray-200 scrollbar-thumb-green-700 hover:scrollbar-thumb-green-500 active:scrollbar-thumb-green-400 basis-11/12'
          msgClasses='pt-1.5 text-small font-light leading-none text-default-600'
          aiProfilePicUrl='/img/logoVA.webp'
          messages={messages}
          msgLimit={4}
          onMsgLimitExceeded={chatWindowOnMsgLmtExceeded}
          topCardHeaderChildren={() => (
            <CardHeader>
              <div className='flex gap-1'>
                <Avatar
                  isBordered
                  showFallback
                  radius='full'
                  size='sm'
                  src='/img/logoVA.webp'
                />
                <p className='pt-1.5 text-small font-light leading-none text-default-600'>
                  ¿Como puedo ayudarte hoy?
                </p>
              </div>
            </CardHeader>
          )}
          msgLimitExceededChildren={() => (
            <CardFooter className='text-center text-red-500'>
              <p>
                Has llegado al limite de mensajes. Porfavor, refresca esta
                página
              </p>
            </CardFooter>
          )}
        ></AiChatWindow>

        <Input
          className='basis-1/12'
          onValueChange={value => setQuery(value)}
          placeholder='Escribe tu pregunta'
          onKeyDown={inputHandleKeyDown}
          value={query}
          disabled={inputIsDisabled}
          endContent={
            <Button
              className='data-[disabled=true]:opacity-25 hover:cursor-pointer'
              isPressedClasses={{
                false: "h-6 w-6",
                true: "h-5 w-5",
              }}
              size='sm'
              variant='light'
              isIconOnly
              isHoveredChildren={() => <MailIconSolid />}
              onClick={buttonOnClick}
              isDisabled={buttonIsDisabled}
              isDisabledClass='opacity-80'
            >
              <MailIconOutline />
            </Button>
          }
        ></Input>
      </div>

      <div className='flex flex-col gap-3 lg:col-span-1 lg:p-1'>
        <Card className='flex basis-2/12 flex-col justify-center lg:p-2'>
          <CardHeader className='lg:p-0.5'>
            <p>Modelo:</p>
          </CardHeader>
          <Dropdown
            buttonVariant='bordered'
            buttonClassName='capitalize w-full lg:text-left'
            items={dropdownItems}
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys as () => void}
            dropdownMenuClasses='text-left'
          ></Dropdown>
        </Card>

        <Card className='flex basis-2/12 flex-col justify-center lg:p-2'>
          <Slider
            label='Tokens'
            step={1}
            minValue={0}
            maxValue={4000}
            defaultValue={2000}
          />
        </Card>
      </div>
    </div>
  )
}
