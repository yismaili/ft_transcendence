import Style from "./Win_loss.module.css";

type props = {
  Data: User;
};

export default function Win_loss(prop: props) {
  return (
    <div className={Style.profileBar}>
      <div className={Style.win_loss}>
        <div className={Style.subContainer}>
          <h3 id={Style.special_case}>total games</h3>
          <p>{prop.Data.profile.score}</p>
        </div>
        <div className={Style.line}></div>
        <div className={Style.subContainer}>
          <h3>win</h3>
          <p>{prop.Data.profile.win}</p>
        </div>
        <div className={Style.line}></div>
        <div className={Style.subContainer}>
          <h3>prop</h3>
          <p>{prop.Data.profile.los}</p>
        </div>
      </div>
      <div className={Style.xp}>
        <p>{prop.Data.profile.xp}%</p>
      </div>
    </div>
  );
}
