"use client";

import { Avatar, Card, CardHeader, Spinner } from "@nextui-org/react";
import { Message } from "@/types/message";
import isEven from "@/util/isEven";
import { useEffect } from "react";

type ChatWindowProps = {
  messages: Message[];
  msgLimit?: number;
  onMsgLimitExceeded?: (...args: any[]) => void;
  topCardHeaderChildren?: () => React.ReactNode;
  msgLimitExceededChildren?: () => React.ReactNode;
  cardClasses?: string;
  msgClasses?: string;
  aiProfilePicUrl: string;
  isLoadingResponse?: boolean;
  isLoadingContent?: () => React.ReactNode;
  iconSelect?: () => React.ReactNode;
};

export default function AiChatWindow({
  messages,
  msgLimit = Infinity,
  onMsgLimitExceeded = () => null,
  msgLimitExceededChildren = () => null,
  topCardHeaderChildren = () => null,
  cardClasses,
  msgClasses,
  aiProfilePicUrl,
  isLoadingResponse = false,
  isLoadingContent = () => null,
}: ChatWindowProps) {
  if (msgLimit !== Infinity && !isEven(msgLimit))
    throw new Error("msgLimit must be an even number");

  const msgsExists = messages.length > 0;
  const msgLimitExceeded = messages.length >= msgLimit;

  useEffect(() => {
    if (msgLimitExceeded) onMsgLimitExceeded();
  }, [msgLimitExceeded, onMsgLimitExceeded]);

  return (
    <Card className={cardClasses}>
      {topCardHeaderChildren()}

      {msgsExists &&
        messages.map(msg =>
          msg.role === "ai" ? (
            <CardHeader key={msg.id}>
              <div className='flex gap-3'>
                <div className='flex-1 justify-items-center'>
                  <Avatar
                    isBordered
                    showFallback
                    radius='full'
                    size='sm'
                    src={aiProfilePicUrl}
                  />
                </div>
                <div className='flex-2 text-justify'>
                  <div className='leading-1.5 flex w-full  flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700'>
                    <p className={msgClasses}>{msg.text}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
          ) : (
            <CardHeader key={msg.id} dir='rtl'>
              <div className='flex gap-3'>
                <div className='flex-1 justify-items-center'>
                  <Avatar
                    isBordered
                    showFallback
                    radius='full'
                    size='sm'
                    src={undefined}
                  />
                </div>
                <div className='flex-2 text-justify'>
                  <div className='leading-1.5  flex w-full flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700'>
                    <p className={msgClasses} dir='ltr'>
                      {msg.text}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
          ),
        )}

      {isLoadingResponse && isLoadingContent()}
      {msgLimitExceeded && msgLimitExceededChildren()}
    </Card>
  );
}
