"use server";
import Link from "next/link";
import { cookies } from "next/headers";
import Style from "./UserDashboard.module.css";
import Win_loss from "../dashboard/Win_loss/Win_loss";
import Achievement_history from "../dashboard/Achievement_history/Achievement_history";

export default async function Dashboard() {
  const cookieStore = cookies();

  const data = await fetch("http://localhost:3000/api/home", {
    credentials: "same-origin",
    headers: {
      cookie: "userData=" + cookieStore.get("userData")?.value,
      SameSite: "none",
    },
  });
  const user = await data.json();

  console.log("data is", data);
  console.log("user is", user);


  return (
    <div className={Style.container}>
      <header className={Style.header}>
        <Link href="/chat" className={Style.chatRoomBtn}>
          <p>chat room</p>
        </Link>
        <div className={Style.profileBtn}>
          <p>profile</p>
        </div>
      </header>

      <main className={Style.main}>
        <div className={Style.image}>
          <p>{user.profile.level}</p>
        </div>
        <p>{user.username}</p>
        <div className={Style.setting}></div>
      </main>
      {/* <Win_loss Data={data} />
      <Achievement_history Data={data} /> */}
    </div>
  );
}
