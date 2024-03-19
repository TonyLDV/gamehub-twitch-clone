import React from "react";
import { currentUser } from "@clerk/nextjs";
import { getUserByUsername } from "@/lib/services/user-service";
import StreamPlayer from "@/components/stream-player";

type CreatorPageProps = { params: { username: string } };

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || externalUser?.id !== user.externalUserId || !user.stream) {
    throw new Error("Unathorized");
  }
  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
};

export default CreatorPage;
