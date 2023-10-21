"use client";
import { useState } from "react";
import "@/global_css/resets.css";
import "./page.css";

export default function MatchMaking() {
  return (
    <div className="backdrop">
      <div className="middleSection">
        <div className="userVSfriend">
          <div className="image">
            <span
              className="profile__pic"
              style={{ backgroundImage: `url("/img/friend_avatar.png")` }}
            >
              <span className="profile__level">16</span>
            </span>
          </div>
          <div className="userVSfriend__info">
            <div className="waiting">
              <span className="waiting__msg">Waiting </span>
              <span className="waiting__icon"></span>
            </div>
            <span className="VS">VS</span>
            <button className="cancel__btn">cancel</button>
          </div>
          <div className="image">
            <span
              className="profile__pic"
              style={{ backgroundImage: `url("/img/friend_avatar.png")` }}
            >
              <span className="profile__level">16</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
