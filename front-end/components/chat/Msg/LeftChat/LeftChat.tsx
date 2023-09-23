import Style from "./LeftChat.module.css";

type props = {
  oldMessage: allMessages | undefined;
  newMessage: allMessages | undefined;
  friendData: UserFriend;
};

export default function LeftChat({
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
          style={{ backgroundImage: `url(${friendData.user.picture})` }}
        ></div>
        <p className={Style.name}>{friendData.user.username}</p>
        <p className={Style.msg}>{oldMessage.message}</p>
        <p className={Style.time}>{oldMessage.dateToSend}</p>
      </div>
    );
  else if (newMessage)
    return (
      <div className={Style.container}>
        <div
          className={Style.img}
          style={{ backgroundImage: `url(${friendData.user.picture})` }}
        ></div>
        <p className={Style.name}>{friendData.user.username}</p>
        <p className={Style.msg}>{newMessage.message}</p>
        <p className={Style.time}>{newMessage.dateToSend}</p>
      </div>
    );
  else return <>test</>;
}
