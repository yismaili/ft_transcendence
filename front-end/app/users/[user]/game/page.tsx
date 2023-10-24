"use client";
import { useEffect, useState } from "react";
import "@/styles/global.css";
import Game from "@/components/Game/Game";
import SocketGameContextProvider from "@/contexts/socket-game-context";

export default function page() {
  const [test, setTest] = useState(false);

  useEffect(() => {
    setTest(true);
  }, []);
  return ( 
    test && (
      <SocketGameContextProvider>
        <Game />
      </SocketGameContextProvider>
    )
  );
}
