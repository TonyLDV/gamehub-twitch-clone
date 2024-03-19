"use client";

import React from "react";

import StreamHeader from "./header";
import AboutCard from "./about-card";
import ChatToggle from "./chat-toggle";
import Chat, { ChatSkeleton } from "./chat";
import Video, { VideoSkeleton } from "./video";
import InformationCard from "./information-card";

import { cn } from "@/lib/utils";
import { ChatHeaderSkeleton } from "./chat-header";
import { LiveKitRoom } from "@livekit/components-react";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { useViewerToken } from "@/hooks/use-viewer-token";

type CustomStream = {
  id: string;
  name: string;
  isLive: boolean;
  isChatEnable: boolean;
  isChatDelayed: boolean;
  thumbnailUrl: string | null;
  isChatFollowersOnly: boolean;
};

type CustomUser = {
  id: string;
  username: string;
  imageUrl: string;
  bio: string | null;
  stream: CustomStream | null;
  _count: { followedBy: number };
};

type StreamPlayerProps = {
  user: CustomUser;
  stream: CustomStream;
  isFollowing: boolean;
};

const StreamPlayer = ({ stream, user, isFollowing }: StreamPlayerProps) => {
  const { collapsed } = useChatSidebar((state) => state);
  const { token, name, identity } = useViewerToken(user.id);

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostName={user.username} hostIdentity={user.id} />

          <StreamHeader
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InformationCard
            hostIdentity={user.id}
            name={stream.name}
            viewerIdentity={identity}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <AboutCard
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
          />
        </div>

        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isChatDelayed={stream.isChatDelayed}
            isChatEnable={stream.isChatEnable}
            isChatFollowersOnly={stream.isChatFollowersOnly}
            isFollowing={isFollowing}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export default StreamPlayer;

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <ChatHeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
