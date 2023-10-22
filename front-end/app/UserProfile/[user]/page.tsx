"use client";
import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "@/components/profile/page.css";
import "@/styles/global.css";
import React from "react";
import ProfilePic from "@/components/profile/profile_pic/profile_pic";
import Analytics from "@/components/profile/analytics/analytics";
import Link from "next/link";
import cookies from "cookies-ts";
import ProfileHeader from "@/components/profile/profile_header/profile_header";
import History__Achievements from "@/components/profile/achievement__history/achievement__history";
import { useState, useEffect } from "react";

export default function Profile({ params }: { params: { user: string } }) {
  let [user, setUser] = useState<User>();
  let [owner, setOwner] = useState(true);
  let [path, setPath] = useState("");

  useEffect(() => {
    const cookieStore = new cookies();
    const Data = JSON.stringify(cookieStore.get("userData"));
    if (Data) {
      const cookie = JSON.parse(Data);
      setPath(cookie.response.user.username);
      if (cookie.response.user.username == params.user) {
        const fetching = async () => {
          const res = await fetch("http://localhost:3000/api/home");
          const user = await res.json();
          setUser(user);
          setOwner(true);
        };
        fetching();
      } else {
        const fetching = async () => {
          const res = await fetch("http://localhost:3000/api/friend", {
            method: "POST",
            body: params.user,
          });
          const user = await res.json();

          setUser(user);
          setOwner(false);
        };

        fetching();
      }
    }
  }, []);

  if (user) {
    return (
      <div className="container">
        <ProfileHeader path={path} />
        <div className="profile__section">
          <ProfilePic user={user} param={owner} />
          {user && <Analytics user={user} />}
          <History__Achievements />
          <div className="play">
            {owner && (
              <Link href="/game" className="play__btn">
                PLAY
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div>failed to get token</div>
    </>
  );
}
