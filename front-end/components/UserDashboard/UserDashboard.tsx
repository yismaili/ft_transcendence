"use server";
import Link from "next/link";
import { cookies } from "next/headers";
import Style from "./UserDashboard.module.css";
import Win_loss from "./Win_loss/Win_loss";
import Achievement_history from "./Achievement_history/Achievement_history";

export default async function UserDashboard({
  params,
}: {
  params: { user: string };
}) {
  const cookieStore = cookies();
  const Data = cookieStore.get("userData")?.value;
  if (Data) {
    const cookie = JSON.parse(Data);
    const token = cookie.response.token;
    const data = await fetch(
      `http://localhost:3001/users/profile/${cookie.response.user.username}/searchTouser/${params.user}`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    var user = await data.json();
  }

  if (user.profile)
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
        <Win_loss user={user} />
        {/* <Achievement_history user={user} /> */}
      </div>
    );
  else
    <>
      <p>retry</p>;
    </>;
}
