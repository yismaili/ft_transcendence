import Style from "./User.module.css";

export default function User() {
  return (
    <div className={Style.user}>
      <div className={Style.firstChild}>
        <div className={Style.avatar} />
        <p className={Style.name}>zina dawdia</p>
      </div>
      <div className={Style.icon} />
    </div>
  );
}
