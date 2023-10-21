"use client";
import { useEffect, useState } from "react";
import "../../styles/global.css";
import Chat from "@/components/chat/Chat";
import SocketContextProvider from "@/contexts/socket-context";

export default function Home() {
  const [test, setTest] = useState(false);

  useEffect(() => {
    setTest(true);
  }, []);
  return (
    test && (
      <SocketContextProvider>
        <Chat />
      </SocketContextProvider>
    )
  );
}
