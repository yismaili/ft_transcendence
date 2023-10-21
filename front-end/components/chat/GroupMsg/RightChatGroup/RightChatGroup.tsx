import Style from "./RightChatGroup.module.css";

type props = {
  oldMessage: allGroupMessages | undefined;
  newMessage: allGroupMessages | undefined;
};

export default function RightChatGroup({ oldMessage, newMessage }: props) {
  // console.log("right old message: ", oldMessage);
  // console.log("right new message: ", newMessage);

  if (oldMessage)
    return (
      <div className={Style.container}>
        <p className={Style.msg}>{oldMessage.message}</p>
        <p className={Style.time}>{oldMessage.date}</p>
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
