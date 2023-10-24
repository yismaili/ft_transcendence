"use client";
import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "@/components/profile/Parameters/params.css";
import SocketContextProvider from "@/contexts/socket-context";

import Params from "@/components/profile/Parameters/Params";

export default function Parametters() {
  return (
    <SocketContextProvider>
      <Params />;
    </SocketContextProvider>
  );
}
