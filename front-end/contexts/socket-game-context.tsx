"use client";
import React, { createContext, useState, useContext } from "react";
import Cookies from "cookies-ts";
import io from "socket.io-client";

const socketGameContext = createContext<any>(null);

export default function SocketGameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = new Cookies();
  const Data = JSON.parse(JSON.stringify(cookies.get("userData")));
  

  const [socket] = useState(
    io("0.0.0.0:3001/game", {
      extraHeaders: {
        Authorization: Data.response.token,
      },
    })
  );

  return (
    <socketGameContext.Provider value={{ socket, Data }}>
      {children}
    </socketGameContext.Provider>
  );
}

export function useSocketGameContext() {
  const context = useContext(socketGameContext);
  if (!context)
    throw Error("useSocketGameContext must be used within a SocketContext");
  return context;
}
