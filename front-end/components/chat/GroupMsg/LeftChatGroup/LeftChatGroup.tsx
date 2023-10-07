import Style from "./LeftChatGroup.module.css";

type props = {
  oldMessage: allGroupMessages | undefined;
  newMessage: allGroupMessages | undefined;
  friendData: User_Friend;
};

export default function LeftChatGroup({
  oldMessage,
  newMessage,
  friendData,
}: props) {
  // console.log("Left old message: ", oldMessage);
  // console.log("left new message: ", newMessage);

  if (oldMessage)
    return (
      <div className={Style.container}>
        <div
          className={Style.img}
          style={{ backgroundImage: `url(${friendData.picture})` }}
        ></div>
        <p className={Style.name}>{friendData.username}</p>
        <p className={Style.msg}>{oldMessage.message}</p>
        <p className={Style.time}>{oldMessage.date}</p>
      </div>
    );
  else if (newMessage)
    return (
      <div className={Style.container}>
        <div
          className={Style.img}
          style={{ backgroundImage: `url(${friendData.picture})` }}
        ></div>
        <p className={Style.name}>{friendData.username}</p>
        <p className={Style.msg}>{newMessage.message}</p>
        <p className={Style.time}>{newMessage.date}</p>
      </div>
    );
  else return <>test</>;
}
