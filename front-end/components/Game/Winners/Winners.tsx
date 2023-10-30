"use client";
import "@/global_css/resets.css";
import Style from "./Winners.module.css";
import { useSocketContext } from "@/contexts/socket-context";
import { useEffect } from "react";
import io from "socket.io-client";

type props = {
  gameOver: gameOver;
};

export default function Winners({ gameOver }: props) {
  const { socket, Data, onlineSocket, gameSocket, setGameSocket } =
    useSocketContext();

  useEffect(() => {
    gameSocket.disconnect();
    setGameSocket(
      io("0.0.0.0:3001/game", {
        extraHeaders: {
          Authorization: Data.response.token,
        },
      })
    );
  }, []);

  return (
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
        <div className={Style.image} style={{ opacity: 0.4 }}>
          <span
            className={Style.profile__pic}
            style={{
              backgroundImage: `url(${gameOver.loser.picture})`,
            }}
          ></span>
          <span className={Style.name}>{gameOver.loser.uniquename}</span>
        </div>
      </div>
    </div>
  );
}
