import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
      <h1 className="text-4xl">404</h1>
      <p>We couln&apos;t find user you were looking for</p>
      <Button variant="secondary" asChild>
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
