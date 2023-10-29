"use client";
import "@/global_css/resets.css";
import Style from "./Winners.module.css";

type props = {
  gameOver: gameOver;
};

export default function Winners({ gameOver }: props) {

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
          <span className={Style.name}>{gameOver.loser.username}</span>
        </div>
      </div>
    </div>
  );
}
