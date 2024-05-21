"use server"

import { Message } from "@/types/message"

type GetMessagesResponse = {
  data: Message[]
  prev: number | null
  first: number
  next: number
  last: number
  pages: number
  items: number
}

export default async function getMessages(page: number, perPage: number) {
  const url = new URL(
    `${process.env.BACKEND_BASE_URL!}/messages?_page=${page}&_per_page=${perPage}`,
  )

  try {
    const response = await fetch(url).then<GetMessagesResponse>(res =>
      res.json(),
    )

    return response
  } catch (error) {
    throw new Error(
      `An error was caught while getting messages: ${JSON.stringify(error, null, 2)}`,
    )
  }
}
