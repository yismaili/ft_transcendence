import "./achievements.css";

type props = {
  isDisplay: boolean;
};

function Achievements({ isDisplay }: props) {
  return (
    <div className={`achievements ${isDisplay ? "show__Achievement" : "noshow__Achievement"}`}>
      <h3 className="achievements__title">achievements</h3>
    </div>
  );
}

export default Achievements;
