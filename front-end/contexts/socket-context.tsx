"use client";
import React, { createContext, useState, useContext } from "react";
import Cookies from "cookies-ts";
import io from "socket.io-client";
import { useRouter } from "next/navigation";

const socketContext = createContext<any>(null);

export default function SocketContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = new Cookies();
  const Data = JSON.parse(JSON.stringify(cookies.get("userData")));
  const router = useRouter();
  if(Data)
  {
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

  const [gameSocket, setGameSocket] = useState(
    io("0.0.0.0:3001/game", {
      extraHeaders: {
        Authorization: Data.response.token,
      },
    })
  );

  return (
    <socketContext.Provider value={{ socket, Data, onlineSocket, gameSocket, setGameSocket }}>
      {children}
    </socketContext.Provider>
  );
}else{
  cookies.remove("userData");
  // router.push("http://localhost:3000/login");
  throw Error("useSocketContext must be used within a SocketContext");
}

}

export function useSocketContext() {
  const router = useRouter();
  const cookies = new Cookies();
  const context = useContext(socketContext);
  if (!context) {
    throw Error("error in context");
  }

  return context;
}
