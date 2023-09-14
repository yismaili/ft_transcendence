import Style from "./Achievement_history.module.css";

type props = {
  Data: User;
};

export default function Achievement_history(prop: props) {
  return (
    <>
      <footer className={Style.footer}>
        <div className={Style.achievement}>
          <h2>achievement</h2>
          <p>{prop.Data.achievements}</p>
        </div>
        <div className={Style.history}>
          <h2>history</h2>
          <p>{prop.Data.histories}</p>
        </div>
      </footer>
      <button className={Style.playBtn}>PLAY</button>
    </>
  );
}
