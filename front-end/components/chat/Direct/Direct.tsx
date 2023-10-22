import { useEffect, useState } from "react";
import Style from "./Direct.module.css";
import { useSocketContext } from "@/contexts/socket-context";

type props = {
  data: User_Friend;
  choseChat: Function;
};

export default function Direct({ data, choseChat }: props) {
  const { socket, Data } = useSocketContext();
  const [status, setStatus] = useState(data.status);
  const choseConversation = () => {
    choseChat(data);
  };

  useEffect(() => {
    socket.on("updateUi", (messaged: string) => {
      console.log(messaged);
      if (messaged.split(" ")[0] === "status") {
        setStatus(messaged.split(" ")[1]);
      }
    });
  }, []);

  return (
    <div className={Style.container} onClick={choseConversation}>
      <div className={Style.imgContainer}>
        <div
          className={Style.avatar}
          style={{ backgroundImage: `url("${data.picture}")` }}
        ></div>
        <div
          className={`${Style.onlineStatus} ${
            data.status === "online" && Style.On
          }`}
        ></div>
      </div>
      <p className={Style.name}>{data.username}</p>
      <div className={Style.icon}></div>
    </div>
  );
}
