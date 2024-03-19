"use client";
import { ReceivedChatMessage } from "@livekit/components-react";
import React from "react";
import ChatMessage from "./chat-message";
import { Skeleton } from "../ui/skeleton";

type ChatListProps = {
  isHidden: boolean;
  messages: ReceivedChatMessage[];
};

const ChatList = ({ isHidden, messages }: ChatListProps) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex-center flex-1">
        <p className="text-sm text-muted-foreground">
          {isHidden ? "Chat is disabled" : "Welcome to the chat"}
        </p>
      </div>
    );
  }

  return (
    <div className="max-h-[685px] overflow-y-auto">
      {messages.map((message) => (
        <ChatMessage key={message.timestamp} data={message} />
      ))}
    </div>
  );
};

export default ChatList;

export const ChatListSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1.5 h-6" />
    </div>
  );
};
