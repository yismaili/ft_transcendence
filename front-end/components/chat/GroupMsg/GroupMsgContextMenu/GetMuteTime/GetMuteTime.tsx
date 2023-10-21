import Style from "./GetMuteTime.module.css";

type props = {
  setTimeToMute: Function;
  timeMenuPosition: { x: number; y: number };
  setIsTimeToMuteOpen: Function;
};

export default function GetMuteTime({
  setTimeToMute,
  timeMenuPosition,
  setIsTimeToMuteOpen,
}: props) {
  return (
    <>
      <div
        className={Style.backDrop___}
        onClick={() => setIsTimeToMuteOpen((prev: boolean) => !prev)}
      />
      <div
        style={{ top: timeMenuPosition.y, left: timeMenuPosition.x }}
        className={Style.context}
      >
        <menu className={Style.context__menu}>
          <li
            className={Style.context__menu__opt}
            onClick={() => setTimeToMute(1)}
          >
            <p>1 min</p>
          </li>
          <li
            className={`${Style.context__menu__opt} ${Style.borders}`}
            onClick={() => setTimeToMute(1440)}
          >
            <p>1 day</p>
          </li>
          <li
            className={`${Style.context__menu__opt} ${Style.borders}`}
            onClick={() => setTimeToMute(10080)}
          >
            <p>1 week</p>
          </li>
        </menu>
      </div>
    </>
  );
}
