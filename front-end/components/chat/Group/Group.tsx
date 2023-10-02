import Style from './Group.module.css'

type props = {
  data: User_Friend;
  choseChat: Function;
};

export default function Group({ data, choseChat }: props) {

  const choseGroup = () => {
    choseChat(data);
  };

  return (
    <div className={Style.container} onClick={choseGroup}>
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
