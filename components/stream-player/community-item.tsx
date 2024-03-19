"use client";
import { cn, stringToColor } from "@/lib/utils";
import React, { useTransition } from "react";
import { Hint } from "../providers/hint";
import { MinusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { onBlock } from "@/actions/block";
import { toast } from "sonner";

type CommunityItemProps = {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
};

const CommunityItem = ({
  hostName,
  participantIdentity,
  viewerName,
  participantName,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();

  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div
      className={cn(
        "group flex item-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-evebgyunts-none"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            disabled={isPending}
            className="w-auto h-auto opacity-0 group-hover:opacity-100 transition"
            onClick={handleBlock}
          >
            <MinusCircle className="w-4 h-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
};

export default CommunityItem;
