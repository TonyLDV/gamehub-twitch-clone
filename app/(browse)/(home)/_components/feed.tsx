import { getStreams } from "@/lib/services/feed-service";
import React from "react";
import FeedCard, { FeedCardSkeleton } from "./feed-card";
import { Skeleton } from "@/components/ui/skeleton";

const Feed = async () => {
  const data = await getStreams();
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Streams we think you&apos;ll like
      </h2>
      {data.length === 0 && (
        <div className="text-muted-foreground text-sm">No streams found =(</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((stream) => (
          <FeedCard data={stream} key={stream.id} />
        ))}
      </div>
    </div>
  );
};

export default Feed;

export const FeedSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
        {[...Array(6).map((_, i) => <FeedCardSkeleton key={i} />)]}
      </div>
    </div>
  );
};
