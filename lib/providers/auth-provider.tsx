"use client";

import SessionCheckLoader from "@/components/Common/Loaders/session-check";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

type Props = React.PropsWithChildren;

const AuthProvider: React.FC<Props> = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === "loading") return <SessionCheckLoader />;

  return <>{children}</>;
};

export default AuthProvider;
