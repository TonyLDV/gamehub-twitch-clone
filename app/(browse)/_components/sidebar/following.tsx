"use client";
import { useSidebar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client";
import React from "react";
import UserItem, { UserItemSkeleton } from "./user-item";

type FollowingProps = {
  data: (Follow & {
    following: User & {
      stream: { isLive: boolean } | null;
    };
  })[];
};

const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state);

  if (!data.length) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}

      <ul>
        {data.map((follow) => (
          <UserItem
            key={follow.following.id}
            imageUrl={follow.following.imageUrl}
            username={follow.following.username}
            isLive={follow.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export default Following;

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3).map((_, i) => <UserItemSkeleton key={i.toString + ""} />)]}
    </ul>
  );
};
