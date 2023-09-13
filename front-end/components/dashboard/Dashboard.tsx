"use server";
import Style from "./Dashboard.module.css";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const mycookie = cookies().get("userData");
  console.log(mycookie);

  return (
    <div className={Style.container}>
      <header className={Style.header}>
        <div className={Style.chatRoomBtn}>
          <p>chat room</p>
        </div>
        <div className={Style.profileBtn}>
          <p>profile</p>
        </div>
      </header>
      <main className={Style.main}>
        <div className={Style.image}>
          <p>15</p>
        </div>
        <p>alouane04</p>
        <div className={Style.setting}></div>
      </main>
      {/* <main className={Style.footer}>

      </main>
      <footer className={Style.footer}>

      </footer> */}
    </div>
  );
}
