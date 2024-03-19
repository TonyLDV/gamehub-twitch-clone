import React from "react";

import { redirect } from "next/navigation";
import Navbar from "./(_components)/navbar";
import Sidebar from "./(_components)/sidebar";
import Container from "./(_components)/container";
import { getSelfByUsername } from "@/lib/services/auth-service";

type CreatorLayoutProps = {
  params: { username: string };
  children: React.ReactNode;
};

const CreatorLayout = ({ children, params }: CreatorLayoutProps) => {
  const self = getSelfByUsername(params.username);

  if (!self) {
    redirect("/");
  }

  return (
    <>
      <Navbar />

      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;
