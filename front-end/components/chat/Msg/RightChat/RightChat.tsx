import Style from "./RightChat.module.css";

type props = {
  oldMessage: allMessages | undefined;
  newMessage: allMessages | undefined;
};

export default function RightChat({ oldMessage, newMessage }: props) {
  // console.log("right old message: ", oldMessage);
  // console.log("right new message: ", newMessage);

  if (oldMessage)
    return (
      <div className={Style.container}>
        <p className={Style.msg}>{oldMessage.message}</p>
        <p className={Style.time}>{oldMessage.dateToSend}</p>
      </div>
    );
  else if (newMessage)
    return (
      <div className={Style.container}>
        <p className={Style.msg}>{newMessage.message}</p>
        <p className={Style.time}>2:55 am today</p>
      </div>
    );
  else return <>test</>;
}
