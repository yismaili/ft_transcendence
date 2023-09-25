import Style from "./Direct.module.css";

type props = {
  data: User_Friend;
  choseChat: Function;
};

export default function Direct({ data, choseChat }: props) {
  // console.log('data from', data);

  const choseConversation = () => {
    choseChat(data);
  };

  return (
    <div className={Style.container} onClick={choseConversation}>
      <div className={Style.imgContainer}>
        <div
          className={Style.avatar}
          style={{ backgroundImage: `url("${data.picture}")` }}
        ></div>
        <div className={Style.onlineStatus}></div>
      </div>
      <p className={Style.name}>{data.username}</p>
      <div className={Style.icon}></div>
    </div>
  );
}
