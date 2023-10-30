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
import { useRouter } from "next/navigation";

export default function UserProfile({ params }: { params: { user: string } }) {
  const { socket, Data } = useSocketContext();
  let [user, setUser] = useState<User>();
  let [owner, setOwner] = useState(true);
  let [path, setPath] = useState("");
  let [found, setfound] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const cookieStore = new cookies();
    if (Data) {
      socket.emit("updateUI", { message: `status online` });
      setPath(Data.response.user.username);
      if (Data.response.user.username == params.user) {
        const fetching = async () => {
          const res = await fetch("http://localhost:3000/api/home");
          const user = await res.json();
          //console.log("mn wra matfetchit:",user);
          setUser(user);
          setOwner(true);
          setfound(true);
        };

        fetching();
      } else {
        const fetching = async () => {
          const res = await fetch("http://localhost:3000/api/friend", {
            method: "POST",
            body: params.user,
          });
          const users = await res.json();
          // console.log("friend data:",users);
          if (users.data) {
            setUser(users);
            setOwner(false);
            setfound(true);
          } else {
            setfound(false);
            router.push(`http://localhost:3000/users/${Data.response.user.username}`);
          }
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
          <History__Achievements ownerName={params.user} user={user}/>
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
