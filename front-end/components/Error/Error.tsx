"use client";
import "@/styles/global.css";
import "@/global_css/utilityClasses.css";
import "./Error.css";
import { useRouter } from "next/navigation";
import { useSocketContext } from "@/contexts/socket-context";
import Cookies from "cookies-ts";

export default function DefError() {
  const router = useRouter();
  const { socket, Data, onlineSocket } = useSocketContext();
  const cookies = new Cookies();


  const logout = () => {
    socket.emit("updateUI", { message: `status offline` });
    onlineSocket.disconnect();
    cookies.remove("userData");
    router.push("http://localhost:3000/login");
  };

  return (
    <div className="ErrorContainer">
      <div className="Error">
        <h1 className="Error__title"> Error</h1>
        <div className="Error__btns">
          <button className="Error__handle__btn" onClick={() =>             router.push(
              `http://localhost:3000/users/${Data.response.user.username}`
            )}>go back home</button>
          <button className="Error__redir__btn" onClick={() => logout()}>log out</button>
        </div>
      </div>
    </div>
  );
}