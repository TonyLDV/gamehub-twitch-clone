"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import CopyButton from "./copy-button";
import { Button } from "@/components/ui/button";

type KeyCardProps = {
  value: string | null;
};

const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              type={show ? "text" : "password"}
              disabled
              placeholder="Stream Key"
            />
            <CopyButton value={value || ""} />
          </div>
          <Button variant="link" size="sm" onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KeyCard;
