"use client";
import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "./UserProfile.css";
import "@/styles/global.css";
import React from "react";
import ProfilePic from "@/components/profile/profile_pic/profile_pic";
import Analytics from "@/components/profile/analytics/analytics";
import Link from "next/link";
import cookies from "cookies-ts";
import ProfileHeader from "@/components/profile/profile_header/profile_header";
import History__Achievements from "@/components/profile/achievement__history/achievement__history";
import { useState, useEffect } from "react";
import { useSocketContext } from "@/contexts/socket-context";

export default function UserProfile({ params }: { params: { user: string } }) {
  const { socket, Data, onlineSocket, gameSocket } = useSocketContext();
  let [user, setUser] = useState<User>();
  let [owner, setOwner] = useState(true);
  let [path, setPath] = useState("");
  let [found, setFound] = useState(true);

  useEffect(() => {
    const cookieStore = new cookies();
    const Data = JSON.stringify(cookieStore.get("userData"));
    if (Data) {
      socket.emit("updateUI", { message: `status online` });
      const cookie = JSON.parse(Data);
      setPath(cookie.response.user.username);
      if (cookie.response.user.username == params.user) {
        gameSocket.on(
          "inviteFriend",
          (response: { usernam: string; roomName: string }) => {
            console.log("new invire for game in profile:", response);
          }
        );

        const fetching = async () => {
          const res = await fetch("http://localhost:3000/api/home");
          const user = await res.json();
          setUser(user);
          setFound(true);
          setOwner(true);
        };

        fetching();
      } else {
        const fetching = async () => {
          const res = await fetch("http://localhost:3000/api/friend", {
            method: "POST",
            body: params.user,
          });
          const users = await res.json();
          console.log("friend data:",users);
          if (users.data) {
            setUser(users);
            setFound(true);
            setOwner(false);
          } else setFound(false);
        };

        fetching();
      }
    }
  }, []);

  if (user && found) {
    return (
      <div className="container">
        <ProfileHeader path={path} user={user} />
        <div className="profile__section">
          <ProfilePic user={user} param={owner} />
          {user && <Analytics user={user} />}
          <History__Achievements />
          <div className="play">
            {owner ? (
              <Link href={`/users/${Data.response.user.username}/gameMap`} className="play__btn">
                PLAY
              </Link>
            ) : (
              <Link
                href={`/users/${Data.response.user.username}/gameMap?type=invite-${user.data.username}`}
                className="play__btn"
              >
                PLAY
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}
