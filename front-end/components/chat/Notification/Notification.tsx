import Style from "./Notification.module.css";

type props = {
  message: allMessages;
};

export default function Notification({ message }: props) {
  return (
    <div className={Style.container}>
      <div
        className={Style.img}
        style={{ backgroundImage: `url(${message.user.picture})` }}
      ></div>
      <p className={Style.name}>{message.user.uniquename}</p>
      <p className={Style.msg}>{message.message}</p>
      <p className={Style.time}>{message.dateToSend}</p>
    </div>
  );
}
