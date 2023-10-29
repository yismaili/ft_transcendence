"use client";
import { useState } from "react";
import "@/global_css/resets.css";
import Style from "./Winners.module.css";
import { useSocketContext } from "@/contexts/socket-context";

type props = {
  setGameOver: Function;
  gameOver: gameOver;
  // data: { user: User_Friend; userFriend: User_Friend } | undefined;
  // setData: Function;
};

export default function Winners({ setGameOver, gameOver }: props) {
  const { socket, Data, onlineSocket, gameSocket } = useSocketContext();

  // const handleCancel = () => {
  //   gameSocket.emit("cancelGame");
  //   setData(undefined);
  //   setOpen((prev: boolean) => !prev);
  // };

  return (
    // <div className={Style.backdrop}>
      <div className={Style.middleSection}>
        <div className={Style.userVSfriend}>
          <div className={Style.image}>
            <span
              className={Style.profile__pic}
              style={{ backgroundImage: `url(${gameOver.winner.picture})` }}
            >
              <span
                className={Style.crown}
                style={{ backgroundImage: `url('/img/game/crown.png'})` }}
              />
            </span>
            <span className={Style.name}>{gameOver.winner.uniquename}</span>
          </div>
          <div className={Style.userVSfriend__info}>
            <span
              className={Style.VS}
            >{`${gameOver.winnerScore} : ${gameOver.loserScore}`}</span>
          </div>
          <div className={Style.image}>
            <span
              className={Style.profile__pic}
              style={{
                backgroundImage: `url(${gameOver.loser.picture})`,
              }}
            ></span>
            <span className={Style.name}>{gameOver.loser.username}</span>
          </div>
        </div>
      </div>
    // </div>
  );
}
