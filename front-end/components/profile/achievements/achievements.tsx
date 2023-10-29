"use client";
import "./achievements.css";
import { useSocketContext } from "@/contexts/socket-context";

type props = {
  isDisplay: boolean;
  user: User;
};

function Achievements({ isDisplay, user }: props) {
  const { Data } = useSocketContext();
  // console.log(Data);
  return (
    <div
      className={`achievements ${
        isDisplay ? "show__Achievement" : "noshow__Achievement"
      }`}
    >
      <h3 className="achievements__title">achievements</h3>
      <div className="achievements__list">
        {user.data.profile.score > 0 && (
          <div className="achievements__list__ach">
            <span className="achievements__list__trophy silver"></span>
            <h3 className="achievements__list__ach__title"> first game</h3>
          </div>
        )}
        {user.data.profile.win > 0 && (
          <div className="achievements__list__ach">
            <span className="achievements__list__trophy goldStar"></span>
            <h3 className="achievements__list__ach__title"> first win</h3>
          </div>
        )}
        {user.data.profile.los > 0 && (
          <div className="achievements__list__ach">
            <span className="achievements__list__trophy gold"></span>
            <h3 className="achievements__list__ach__title">first loss</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Achievements;
