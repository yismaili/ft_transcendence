import Style from "./Win_loss.module.css";

type props = {
  user: User | undefined;
};

export default function Win_loss({ user }: props) {
  return (
    <div className={Style.profileBar}>
      <div className={Style.win_loss}>
        <div className={Style.subContainer}>
          <h3 id={Style.special_case}>total games</h3>
          {typeof user == "undefined" ? (
            <p>0</p>
          ) : (
            <p>{user.data.profile.score}</p>
          )}
        </div>
        <div className={Style.line}></div>
        <div className={Style.subContainer}>
          <h3>win</h3>
          {typeof user == "undefined" ? (
            <p>0</p>
          ) : (
            <p>{user.data.profile.win}</p>
          )}
        </div>
        <div className={Style.line}></div>
        <div className={Style.subContainer}>
          <h3>prop</h3>
          {typeof user == "undefined" ? (
            <p>0</p>
          ) : (
            <p>{user.data.profile.los}</p>
          )}
        </div>
      </div>
      <div className={Style.xp}>
        {typeof user == "undefined" ? <p>0%</p> : <p>{user.data.profile.xp}%</p>}
      </div>
    </div>
  );
}
