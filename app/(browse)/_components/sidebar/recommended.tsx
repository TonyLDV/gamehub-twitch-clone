"use client";
import React from "react";

import { Stream, User } from "@prisma/client";
import { useSidebar } from "@/store/use-sidebar";
import UserItem, { UserItemSkeleton } from "./user-item";

type RecommendedProps = {
  data: (User & { stream: { isLive: boolean } | null })[];
};
const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;
  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul>
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export default Recommended;

export const RecommendedSkeleton = () => {
  return (
    <li className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i.toString + ""} />
      ))}
    </li>
  );
};
