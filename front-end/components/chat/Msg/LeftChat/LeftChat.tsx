import Style from "./LeftChat.module.css";

type props = {
  message: any,
  friendData: UserFriend
};

export default function LeftChat({ message, friendData }: props) {
  return (
    <>
      <div className={Style.container}>
        <div
          className={Style.img}
          style={{ backgroundImage: `url(${friendData.user.picture})` }}
        ></div>
        <p className={Style.name}>{friendData.user.username}</p>
        <p className={Style.msg}>{message}</p>
        <p className={Style.time}>today 14:55</p>
      </div>
    </>
  );
}
