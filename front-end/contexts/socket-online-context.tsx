"use client";
import React, { createContext, useState, useContext } from "react";
import Cookies from "cookies-ts";
import io from "socket.io-client";

const socketOnlineContext = createContext<any>(null);

export default function SocketOnlineContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = new Cookies();
  const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

  const [socket] = useState(
    io("0.0.0.0:3001", {
      extraHeaders: {
        Authorization: Data.response.token,
      },
    })
  );

  return (
    <socketOnlineContext.Provider value={{ socket, Data }}>
      {children}
    </socketOnlineContext.Provider>
  );
}

export function useSocketOnlineContext() {
  const context = useContext(socketOnlineContext);
  if (!context)
    throw Error(
      "useSocketOnlineContext must be used within a SocketOnlineContext"
    );
  return context;
}
