"use client";
import { useParticipants } from "@livekit/components-react";
import React, { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import CommunityItem from "./community-item";

type ChatCommunityProps = {
  hostName: string;
  viwerName: string;
  isHidden: boolean;
};

const ChatCommunity = ({
  hostName,
  isHidden,
  viwerName,
}: ChatCommunityProps) => {
  const [value, setValue] = useState("");
  const debounceValue = useDebounce<string>(value, 500);
  const participants = useParticipants();

  const filteredParticipants = useMemo(() => {
    if (!debounceValue.length) {
      return participants;
    }

    return participants.filter(
      (p) => p.name?.toLocaleLowerCase() == debounceValue.toLocaleLowerCase()
    );
  }, [participants, debounceValue]);

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <Input
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search community"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          No results
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viwerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatCommunity;
