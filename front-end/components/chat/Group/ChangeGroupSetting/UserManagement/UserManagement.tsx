import { useState } from "react";
import Style from "./UserManagement.module.css";
import User from "./user/User";
import Cookies from "cookies-ts";
import { io, Socket } from "socket.io-client";

export default function UserManagement() {


  const cookies = new Cookies();
  const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

  const [socket] = useState(
    io("0.0.0.0:3001", {
      extraHeaders: {
        Authorization: Data.response.token,
      },
    })
  );

  console.log(Data.response.user.username);
  

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    // socket.emit('JoinUsertoRoom', {adminUsername: Data.response.user.username, username: , statusPermissions: , chatRoomName: })
  };

  return (
    <>
      <div className={Style.container}>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            onChange={handleChange}
            placeholder="user name to search for"
          />
        </form>
        <div className={Style.Searchicon} />
      </div>
      <div className={Style.users}>
        <User />
      </div>
    </>
  );
}
