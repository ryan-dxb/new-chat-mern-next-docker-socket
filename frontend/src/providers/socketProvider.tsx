"use client";

import { connectSocket } from "@/socketConnection";
import { NextPage } from "next";
import { useEffect } from "react";

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketProvider: NextPage<SocketProviderProps> = ({ children }) => {
  useEffect(() => {
    connectSocket();
  }, []);

  return <>{children}</>;
};

export default SocketProvider;
