import React from "react";

import { notFound } from "next/navigation";
import StreamPlayer from "@/components/stream-player";
import { isBlockedByUser } from "@/lib/services/block-service";
import { getUserByUsername } from "@/lib/services/user-service";
import { isFollowingUser } from "@/lib/services/follow-service.";
import { Actions } from "./_components/action";

type UserPageProps = {
  params: {
    username: string;
  };
};

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return (
    <div className="h-full">
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing={isFollowing}
      />
    </div>
  );
};

export default UserPage;
