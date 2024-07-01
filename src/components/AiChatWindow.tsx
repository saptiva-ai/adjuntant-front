"use client";

import { Avatar, Card, CardHeader, Spinner } from "@nextui-org/react";
import ChatBubble from "@/components/ChatBubble";
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
  profilePicUrl?: string;
  fullName?: string;
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
  profilePicUrl,
  fullName,
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
            <ChatBubble
              key={msg.id}
              user='AI'
              message={msg.text}
              dirChat='ltr'
              dirMessage='ltr'
              src={aiProfilePicUrl}
            ></ChatBubble>
          ) : (
            <ChatBubble
              key={msg.id}
              user={fullName || "You"}
              message={msg.text}
              dirChat='rtl'
              dirMessage='ltr'
              src={profilePicUrl}
            ></ChatBubble>
          ),
        )}

      {isLoadingResponse && isLoadingContent()}
      {msgLimitExceeded && msgLimitExceededChildren()}
    </Card>
  );
}
