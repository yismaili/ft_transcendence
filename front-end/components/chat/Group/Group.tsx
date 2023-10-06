import Style from './Group.module.css'

type props = {
  room: AllRooms;
  choseChat: Function;
};

export default function Group({ room, choseChat }: props) {

  const choseGroup = () => {
    choseChat(room);
  };

  return (
    <div className={Style.container} onClick={choseGroup}>
      <div className={Style.imgContainer}>
        <div
          className={Style.avatar}
          // style={{ backgroundImage: `url("${data.picture}")` }}
        ></div>
        {/* <div className={Style.onlineStatus}></div> */}
      </div>
      <p className={Style.name}>{room.name}</p>
      <div className={Style.icon}></div>
    </div>
  );
}
