"use server";
import Style from "./Dashboard.module.css";
import Win_loss from "./Win_loss/Win_loss";
import Link from "next/link";
import Achievement_history from "./Achievement_history/Achievement_history";
import { cookies } from "next/headers";

export default async function Dashboard() {
  let cookieStore = cookies();

    const data: Promise<User> = await fetch("http://localhost:3000/api/home", {
      credentials: "same-origin",
      headers: {
        cookie: "userData=" + cookieStore.get("userData")?.value,
        SameSite: "none",
      },
    }).then((data) => data.json());
  console.log(data);

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

// "use client";
// import Style from "./Dashboard.module.css";
// import Win_loss from "./Win_loss/Win_loss";
// import Link from "next/link";
// import Achievement_history from "./Achievement_history/Achievement_history";
// import { useEffect, useState } from "react";

// export default function Dashboard() {
//   let [data, setData] = useState<null | User>(null);
//   useEffect(() => {
//     fetch("http://localhost:3000/api/home", {})
//       .then((data) => data.json())
//       .then((data) => setData(data));
//   }, []);

//   if (data) console.log("yoo", data);

//   return (
//     <div className={Style.container}>
//       <header className={Style.header}>
//         <Link href="/chat" className={Style.chatRoomBtn}>
//           <p>chat room</p>
//         </Link>
//         <div className={Style.profileBtn}>
//           <p>profile</p>
//         </div>
//       </header>
//       {/* <main className={Style.main}>
//         <div className={Style.image}>
//           <p>{data?.profile.level}</p>
//         </div>
//         <p>{data?.username}</p>
//         <div className={Style.setting}></div>
//       </main>
//       <Win_loss Data={data} />
//       <Achievement_history Data={data} /> */}
//     </div>
//   );
// }
