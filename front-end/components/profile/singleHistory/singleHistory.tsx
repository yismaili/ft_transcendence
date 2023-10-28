import "./singleHistory.css";

interface hys {
  Player1: Player;
  Player2: Player;
  Player1Score: number;
  Player2Score: number;
}

export default function SingleHistory(prop: hys) {
  return (
    // <div
    //   className="singleHistory__container"
    //   style={{
    //     backgroundColor: `${
    //       prop.Player1Score > prop.Player2Score ? "green" : "red"
    //     }`,
    //   }}
    //   key={Math.random()}
    // >
    <>
      <div className="singleHistory__userImg__username">
        <span
          className="singleHistory__userImg"
          style={{ backgroundImage: `url(${prop.Player1.picture})` }}
        ></span>
        <span className="singleHistory__username">
          {prop.Player1.uniquename}
        </span>
      </div>
      <div className="singleHistory__score">
        <span>{prop.Player1Score}</span>
        <span>:</span>
        <span>{prop.Player2Score}</span>
      </div>
      <div className="singleHistory__userImg__username rightHistory">
        <span className="singleHistory__username">
          {prop.Player2.uniquename}
        </span>
        <span
          className="singleHistory__userImg"
          style={{
            backgroundImage: `url(${prop.Player2.picture})`,
          }}
        ></span>
      </div>
    </>
    // </div>
  );
}
