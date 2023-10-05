import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "./analytics.css";

interface nums {
  user: User;
}

async function Analytics(prop: nums) {
  return (
    <div className="analytics">
      <div className="all__data">
        <div className="data">
          <h3 className="data__title">total games</h3>
          <p className="data__value"> {prop.user.profile.score}</p>
        </div>
        <div className="data data__border">
          <h3 className="data__title">win</h3>
          {prop.user.profile.score != 0 ? (
            <p className="data__value">
              {" "}
              {prop.user.profile.win / prop.user.profile.score} %
            </p>
          ) : (
            <p className="data__value"> {prop.user.profile.win} %</p>
          )}
        </div>
        <div className="data">
          <h3 className="data__title">loss</h3>
          {prop.user.profile.score != 0 ? (
            <p className="data__value">
              {" "}
              {prop.user.profile.los / prop.user.profile.score} %
            </p>
          ) : (
            <p className="data__value"> {prop.user.profile.los} %</p>
          )}
        </div>
      </div>
      <div className="xp__bar">
        <span
          className="current__xp__bar"
          style={{ width: `${prop.user.profile.xp}%` }}
        ></span>
        <p className="xp__text">{prop.user.profile.xp} %</p>{" "}
      </div>
    </div>
  );
}

export default Analytics;
