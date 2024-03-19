import React from "react";

import Toggle, { ToggleSkeleton } from "./toggle";
import { Wrapper } from "./wrapper";
import Recommended, { RecommendedSkeleton } from "./recommended";
import Following, { FollowingSkeleton } from "./following";
import { getRecommended } from "@/lib/services/recommended-service";
import { getFollowedUsers } from "@/lib/services/follow-service.";

const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();

  return (
    <Wrapper>
      <div className="space-y-4 pt-4 lg:pt-0"></div>
      <Toggle />

      <div className="space-y-4 pt-4 lg:pt-0">
        <Recommended data={recommended} />
      </div>

      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={following} />
      </div>
    </Wrapper>
  );
};

export default Sidebar;

export const SidebarSkeleton = () => {
  return (
    <aside
      className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full
     bg-background border-r border-[#2d2e35] z-50"
    >
      <ToggleSkeleton />
      <FollowingSkeleton />

      <RecommendedSkeleton />
    </aside>
  );
};
