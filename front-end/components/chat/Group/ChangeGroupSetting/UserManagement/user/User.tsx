import Style from "./User.module.css";

type props = {
  user: User_Friend;
};

export default function User({ user }: props) {
  return (
    <>
      <div className={Style.firstChild}>
        <div
          className={Style.avatar}
          style={{ backgroundImage: `url(${user.picture})` }}
        />
        <p className={Style.name}>{user.username}</p>
      </div>
      <div className={Style.icon} />
    </>
  );
}
