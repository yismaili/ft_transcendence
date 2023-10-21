import Style from "./Achievement_history.module.css";

type props = {
  user: User | undefined;
};

export default function Achievement_history({ user }: props) {
  return (
    <>
      <footer className={Style.footer}>
        <div className={Style.achievement}>
          <h2>achievement</h2>
          {typeof(user) == 'undefined' ? 
          <></>
          :
          <p>{user.data.achievements}</p>
          }
        </div>
        <div className={Style.history}>
          <h2>history</h2>
          {typeof(user) == 'undefined' ? 
          <></>
          :
          <p>{user.data.histories}</p>
          }
        </div>
      </footer>
      <button className={Style.playBtn}>PLAY</button>
    </>
  );
}
