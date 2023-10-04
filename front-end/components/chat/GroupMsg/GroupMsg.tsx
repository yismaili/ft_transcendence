import Style from "./GroupMsg.module.css";
import io from "socket.io-client";
import Cookies from "cookies-ts";
import { useEffect, useRef, useState } from "react";

type props = {
  groupInput: GroupInput | undefined;
};

export default function GroupMsg({ groupInput }: props) {
  const cookies = new Cookies();
  const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

  const [socket] = useState(
    io("0.0.0.0:3001", {
      extraHeaders: {
        Authorization: Data.response.token,
      },
    })
  );

  if (groupInput) {
    socket.emit("createChatRoom", {
      name: groupInput.name,
      status: groupInput.status,
      user: Data.response.user.username,
      password: groupInput.password,
      statusPermissions: "admin",
    }, (response: any) => {
        console.log('Yo response', response);
    });
  }

//   useEffect(() => {
//     socket.emit();
//   }, []);

  return <div>GroupMsg</div>;
}
