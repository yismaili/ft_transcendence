import Style from "./Direct.module.css";

type props = {
  data: UserFriend
}

export default function Direct({ data }: props) {
  return (
    <div className={Style.container}>
      <div className={Style.imgContainer}>
      <div className={Style.avatar} style={{ backgroundImage: `url("${data.user.picture}")` }}>
      </div>
        <div className={Style.onlineStatus}></div>
      </div>
      <p className={Style.name}>{data.user.username}</p>
      <div className={Style.icon}></div>
    </div>
  );
}
