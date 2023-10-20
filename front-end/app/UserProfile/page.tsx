"use client";
import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "@/components/profile/page.css";
import React from "react";
import ProfilePic from "@/components/profile/profile_pic/profile_pic";
import Analytics from "@/components/profile/analytics/analytics";
import Link from "next/link";
import { cookies } from "next/headers";
import ProfileHeader from "@/components/profile/profile_header/profile_header";
import History__Achievements from "@/components/profile/achievement__history/achievement__history";
import { useState, useEffect } from "react";

export default function Profile() {
  let [user, setUser] = useState<User>();

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch("http://localhost:3000/api/home");
      const user = await res.json();
      setUser(user);
    };
    fetching();
  }, []);
  if (user) {
    return (
      <div className="container">
        <ProfileHeader />
        <div className="profile__section">
          <ProfilePic user={user} />
          {user && <Analytics user={user} />}
          <History__Achievements />
          <div className="play">
            <Link href="/game" className="play__btn">
              PLAY
            </Link>
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
