import { url } from "inspector";
import Style from "./PopUp.module.css";

type props = {
  src: string;
  name: string;
  title: string;
  set: Function;
  about: string;
  url: string;
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
      <div className={Style.backdrop} onClick={closePopUp}></div>
      <div className={Style.window}>
        <div className={Style.leftside}>
          <div
            className={Style.imageDiv}
            style={{ backgroundImage: `url(${props.src})` }}
          ></div>
          <button className={Style.button} onClick={handleClick}>
            <i className="fa">&#xf08c;</i>
            CONNECT ON LINKDIN
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
