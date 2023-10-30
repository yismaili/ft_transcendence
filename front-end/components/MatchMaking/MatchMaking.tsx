"use client";
import { useEffect, useState } from "react";
import "@/global_css/resets.css";
import Style from "./MatchMaking.module.css";
import { useSocketContext } from "@/contexts/socket-context";

type props = {
  setOpen: Function;
  data: { user: User_Friend; userFriend: User_Friend } | undefined;
  setData: Function;
};

export default function MatchMaking({ setOpen, data, setData }: props) {
  const { socket, Data, onlineSocket, gameSocket } = useSocketContext();

  useEffect(() => {
    socket.on("updateUI", (messaged: string) => {
      if (messaged.split(" ")[0] === "rejectrequest") {
        if (messaged.split(" ")[1] === Data.response.user.username) {
          handleCancel();
        }
      }
    });
  }, []);

  const handleCancel = () => {
    gameSocket.emit("cancelGame");
    setData(undefined);
    setOpen((prev: boolean) => !prev);
  };

  return (
    <div className={Style.backdrop}>
      <div className={Style.middleSection}>
        <div className={Style.userVSfriend}>
          <div className={Style.image}>
            <span
              className={Style.profile__pic}
              style={{ backgroundImage: `url(${Data.response.user.picture})` }}
            >
              {/* <span className={Style.profile__level}>16</span> */}
            </span>
            <span className={Style.name}>{Data.response.user.uniquename}</span>
          </div>
          <div className={Style.userVSfriend__info}>
            <div className={Style.waiting}>
              <span className={Style.waiting__msg}>Waiting </span>
              <span className={Style.waiting__icon}></span>
            </div>
            <span className={Style.VS}>VS</span>
            {!data && (
              <button className={Style.cancel__btn} onClick={handleCancel}>
                cancel
              </button>
            )}
          </div>
          <div className={Style.image}>
            <span
              className={Style.profile__pic}
              style={{
                backgroundImage: `url(${
                  data
                    ? data.user.username === Data.response.user.username
                      ? data.userFriend.picture
                      : data.user.picture
                    : "/img/home/avatar.png"
                })`,
              }}
            >
              {/* <span className={Style.profile__level}>16</span> */}
            </span>
            <span className={Style.name}>
              {data
                ? data.user.username === Data.response.user.username
                  ? data.userFriend.uniquename
                  : data.user.uniquename
                : "waiting"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
