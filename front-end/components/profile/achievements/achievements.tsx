"use client"
import "./achievements.css";

type props = {
  isDisplay: boolean;
};

function Achievements({ isDisplay }: props) {
  return (
    <div className={`achievements ${isDisplay ? "show__Achievement" : "noshow__Achievement"}`}>
      <h3 className="achievements__title">achievements</h3>
      <div className="achievements__list">
        <div className="achievements__list__ach">
          <span className="achievements__list__trophy silver"></span>
          <h3 className="achievements__list__ach__title"> first game</h3>
        </div>
        <div className="achievements__list__ach">
          <span className="achievements__list__trophy goldStar"></span>
          <h3 className="achievements__list__ach__title"> first win</h3>
        </div>
        <div className="achievements__list__ach">
          <span className="achievements__list__trophy gold"></span>
          <h3 className="achievements__list__ach__title">first loss</h3>
        </div>
      </div>
    </div>
  );
}

export default Achievements;
