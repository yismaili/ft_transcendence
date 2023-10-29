import { useEffect, useState } from "react";
import Style from "./Blocked.module.css";
import { useSocketContext } from "@/contexts/socket-context";

type props = {
  data: User_Friend;
};

export default function Blocked({ data }: props) {
  const { socket, Data } = useSocketContext();

  const handleUnBlock = async () => {
    const res = await fetch(
      `http://${process.env.NEXT_PUBLIC_HOST_PORT}/users/profile/${Data.response.user.username}/unblock/${data.username}`,
      {
        method: "PUT",
        cache: "no-cache",
        headers: { authorization: `Bearer ${Data.response.token}` },
      }
    );
    // const data = await res.json();

    socket.emit("updateUI", {
      message: `unBlock ${Data.response.user.username}`,
    });
  };

  return (
    <div className={Style.container}>
      <div className={Style.imgContainer}>
        <div
          className={Style.avatar}
          style={{ backgroundImage: `url("${data.picture}")` }}
        ></div>
        <div className={Style.onlineStatus} />
      </div>
      <div className={Style.blure} />
      <p className={Style.name}>{data.username}</p>
      <div className={Style.icon} onClick={handleUnBlock} />
    </div>
  );
}
