"use server";
import Style from "./Dashboard.module.css";
import getUserData from "../../action/userData";
import Win_loss from "./Win_loss/Win_loss";
import Achievement_history from "./Achievement_history/Achievement_history";

export default async function Dashboard() {
  const userData: Promise<User> = getUserData();
  const data = await userData;

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
          <p>{data.profile.level}</p>
        </div>
        <p>{data.username}</p>
        <div className={Style.setting}></div>
      </main>
      <Win_loss Data={data} />
      <Achievement_history Data={data} />
    </div>
  );
}
