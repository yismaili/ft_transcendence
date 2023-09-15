import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "@/components/profile/page.css";
import React from "react";
import ProfilePic from "@/components/profile/profile_pic/profile_pic";
import Analytics from "@/components/profile/analytics/analytics";
import Achievements from "@/components/profile/achievements/achievements";
import History from "@/components/profile/history/history";
import Link from "next/link";
import getUser from "@/lib/getUser";
import { cookies } from "next/headers";
import ProfileHeader from "@/components/profile/profile_header/profile_header";

export default async function Profile() {
  const cookie = cookies().get("userData");
  if (cookie) {
    const userData: Promise<User> = getUser(cookie.value);
    const user = await userData;

    return (
      <div className="container">
        <ProfileHeader />
        <div className="profile__section">
          <ProfilePic user={user} />
          {user && <Analytics user={user} />}
          <div className="achievements__history">
            <Achievements />
            <History />
          </div>
          <div className="play">
            <Link href="/Chat" className="play__btn">
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
