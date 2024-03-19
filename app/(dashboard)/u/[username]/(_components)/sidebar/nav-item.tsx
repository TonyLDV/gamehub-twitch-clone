"use client";
import React from "react";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type NavItemProps = {
  href: string;
  label: string;
  isActive: boolean;
  icon: LucideIcon;
};

const NavItem = ({ href, icon: Icon, isActive, label }: NavItemProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
};

export default NavItem;

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center space-y-2 px-2 pt-4 lg:pt-0 gap-2">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md " />

      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
