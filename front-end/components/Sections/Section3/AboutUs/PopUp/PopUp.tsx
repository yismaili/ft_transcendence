import Style from "./PopUp.module.css";

type props = {
  src: string;
  name: string;
  title: string;
  set: Function;
};

export default function PopUp(props: props) {
  function closePopUp() {
    props.set();
  }

  return (
    <div className={Style.container} onClick={closePopUp}>
      hello
    </div>
  );
}
