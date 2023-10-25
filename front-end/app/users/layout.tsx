"use client";

import SocketContextProvider from "@/contexts/socket-context";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [test, setTest] = useState(false);

  useEffect(() => {
    setTest(true);
  }, []);
  return test && <SocketContextProvider>{children}</SocketContextProvider>;
}
