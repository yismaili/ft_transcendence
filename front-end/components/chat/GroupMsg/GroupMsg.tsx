import Style from "./GroupMsg.module.css";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Cookies from "cookies-ts";

type props = {
  groupInput: GroupInput | undefined;
  setGroupInput: Function;
  setData: Function;
};

export default function GroupMsg({
  groupInput,
  setGroupInput,
  setData,
}: props) {
  const cookies = new Cookies();
  const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

  useEffect(() => {
    if (Data) setData(Data);
  }, []);

  const [socket] = useState(
    io("0.0.0.0:3001", {
      extraHeaders: {
        Authorization: Data.response.token,
      },
    })
  );

  useEffect(() => {
    if (groupInput) {
      socket.emit(
        "createChatRoom",
        {
          name: groupInput.name,
          status: groupInput.status,
          user: Data.response.user.username,
          password: groupInput.password,
          statusPermissions: "admin",
        },
        (response: CreateRoom) => {
          console.log("Yo response", response);
        }
      );
      console.log("sala,", socket);

      setGroupInput(undefined);
    }
    // if (Data) setData(Data);
  }, [groupInput]);

  //   useEffect(() => {
  //     socket.emit();
  //   }, []);

  return <div>GroupMsg</div>;
}
