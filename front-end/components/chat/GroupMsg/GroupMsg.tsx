import Style from "./GroupMsg.module.css";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Cookies from "cookies-ts";

type props = {
  groupInput: GroupInput | undefined;
  // setData: Function;
  room: AllRooms;
};

export default function GroupMsg({
  groupInput,
  // setData,
  room,
}: props) {
  // const cookies = new Cookies();
  // const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

  // useEffect(() => {
  //   if (Data) setData(Data);
  // }, []);

  // const [socket] = useState(
  //   io("0.0.0.0:3001", {
  //     extraHeaders: {
  //       Authorization: Data.response.token,
  //     },
  //   })
  // );

  return <div>{room.name}</div>;
}
