"use client";
import React, { createContext, useState, useContext } from "react";
import Cookies from "cookies-ts";
import io from "socket.io-client";

const socketContext = createContext<any>(null);

export default function SocketContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = new Cookies();
  const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

  console.log('test');
  
  const [socket] = useState(
    io("0.0.0.0:3001/chat", {
      extraHeaders: {
        Authorization: Data.response.token,
      },
    })
  );

  const [onlineSocket] = useState(
    io("0.0.0.0:3001", {
      extraHeaders: {
        Authorization: Data.response.token,
      },
    })
  );

  const [gameSocket] = useState(
    io("0.0.0.0:3001/game", {
      extraHeaders: {
        Authorization: Data.response.token,
      },
    })
  );

  return (
    <socketContext.Provider value={{ socket, Data, onlineSocket, gameSocket }}>
      {children}
    </socketContext.Provider>
  );
}

export function useSocketContext() {
  const context = useContext(socketContext);
  if (!context)
    throw Error("useSocketContext must be used within a SocketContext");
  return context;
}
