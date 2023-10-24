"use client";
import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "./logout.css";
import Cookies from "cookies-ts";
import { useRouter } from "next/navigation";
import { useSocketContext } from "@/contexts/socket-context";

export default function Logout() {
  const { socket, Data, onlineSocket } = useSocketContext();
  const cookies = new Cookies();
  const router = useRouter();

  const logout = () => {
    socket.emit("updateUI", { message: `status offline` });
    onlineSocket.disconnect();
    cookies.remove("userData");
    router.push("http://localhost:3000/login");
  };

  return (
    <>
      <button className="logout__btn" onClick={logout}>
        Logout
      </button>
    </>
  );
}
