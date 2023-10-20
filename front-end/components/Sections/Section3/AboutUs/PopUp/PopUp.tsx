import Style from "./PopUp.module.css";
import ReactPlayer from 'react-player';

type props = {
  src: string;
  name: string;
  title: string;
  set: Function;
  about: string;
  url: string;
  music: string;
};

export default function PopUp(props: props) {
  function closePopUp() {
    props.set();
  }

  const handleClick = () => {
    window.open(props.url);
  };

  return (
    <>
    <ReactPlayer
        url={props.music}
        playing={true} // Set to true if you want the audio to auto-play
        controls={false} // Show player controls (play, pause, volume, etc.)
      />
      <div className={Style.backdrop} onClick={closePopUp}></div>
      <div className={Style.window}>
        <div className={Style.leftside}>
          <div
            className={Style.imageDiv}
            style={{ backgroundImage: `url(${props.src})` }}
          ></div>
          <button className={Style.button} onClick={handleClick}>
            <span className={Style.linkdin}></span>
            <span className={Style.btnText}>CONNECT ON LINKDIN</span>
          </button>
        </div>
        <div className={Style.rightside}>
          <div className={Style.title}>
            <h2>{props.name}</h2>
            <p>{props.title}</p>
          </div>
          <p>{props.about}</p>
        </div>
      </div>
    </>
  );
}
