import Style from "./LeftChat.module.css";

export default function LeftChat() {
  return (
    <>
      <div className={Style.container}>
        <div className={Style.img}></div>
        <p className={Style.name}>lm9iwad</p>
        <p className={Style.msg}>blsa</p>
        <p className={Style.time}>today 14:55</p>
      </div>
    </>
  );
}
