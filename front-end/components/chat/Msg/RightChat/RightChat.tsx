import Style from "./RightChat.module.css";

type props = {
  message: allMessages
}

export default function RightChat({ message }: props) {
  return (
    <div className={Style.container}>
      <p className={Style.msg}>{message.message}</p>
      <p className={Style.time}>{message.dateToSend}</p>
    </div>
  );
}
