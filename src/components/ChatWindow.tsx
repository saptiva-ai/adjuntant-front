"use client"

import * as R from "ramda"
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react"
import { useEffect, useRef, useState } from "react"
import { Message } from "@/types/message"
import getMessages from "@/actions/getMessages"

const maxMsgsPerPage = 50

export default function ChatWindow() {
  const [msgsPerPage, setMsgsPerPage] = useState(maxMsgsPerPage)
  const [page, setPage] = useState(1)
  const [messages, setMessages] = useState<Message[]>([])
  const [hasPrevData, setHasPrevData] = useState(false)
  const scrollTrigger = useRef(null)

  const loadMorePosts = () => {
    getMessages(msgsPerPage, maxMsgsPerPage).then(({ data, prev }) => {
      if (R.isNotNil(prev)) {
        setHasPrevData(true)
      }

      setMessages(prevMessages => [...prevMessages, ...data])
      setPage(prevPage => prevPage + 1)
      setMsgsPerPage(prevOffset => prevOffset + maxMsgsPerPage)
    })
  }

  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
        }
      },
      { threshold: 0.5 },
    )

    if (scrollTrigger.current) {
      observer.observe(scrollTrigger.current)
    }

    // eslint-disable-next-line consistent-return
    return () => {
      if (scrollTrigger.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(scrollTrigger.current)
      }
    }
  }, [hasPrevData])

  const arr = new Array(50).fill(0)

  return (
    <Card className='flex h-96 w-96 flex-col gap-1 overflow-auto overscroll-contain bg-gray-700/80 scrollbar scrollbar-track-gray-200 scrollbar-thumb-green-700 hover:scrollbar-thumb-green-500 active:scrollbar-thumb-green-400'>
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
      <div ref={scrollTrigger}>Loading...</div>
    </Card>
  )
}
