import { Suspense } from "react";
import Feed, { FeedSkeleton } from "./_components/feed";

export default function Home() {
  return (
    <main>
      <div className="h-full p-8  max-w-screen-2xl mx auto flex flex-col gap-y-4 ">
        <Suspense fallback={<FeedSkeleton />}>
          <Feed />
        </Suspense>
      </div>
    </main>
  );
}
