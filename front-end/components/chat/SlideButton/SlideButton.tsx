import { useState } from "react";
import Style from "./SlideButton.module.css";
import { motion, useAnimation } from "framer-motion";

type props = {
  func: Function;
  resetChat: Function;
  choseChat: Function;
};

export default function SlideButton({ func, resetChat, choseChat }: props) {
  const [isGroup, setGroup] = useState(false);
  const controls = useAnimation();

  const turnSwitch = () => {
    resetChat(undefined);
    func();
    setGroup(!isGroup);
    choseChat(undefined);
    controls.start(isGroup ? "false" : "true");
  };

  return (
    <div className={Style.slideBtn}>
      <p
        className={`${Style.directTxt} ${isGroup ? "" : Style.On}`}
        onClick={turnSwitch}
      >
        Direct
      </p>
      <p
        className={`${Style.groupTxt}  ${isGroup ? Style.On : ""}`}
        onClick={turnSwitch}
      >
        Group
      </p>
      <motion.div
        transition={{ type: "spring", stiffness: 600, damping: 35 }}
        animate={controls}
        variants={{
          true: { x: "100%" },
          false: { x: "0%" },
        }}
      ></motion.div>
    </div>
  );
}
