import Style from "./Direct.module.css";

export default function Direct() {
  return (
    <div className={Style.container}>
        <div className={Style.avatar}>
          <div className={Style.onlineStatus}></div>
        </div>
        <p className={Style.name}>alouane04</p>
        <div className={Style.icon}></div>
    </div>
  );
}
