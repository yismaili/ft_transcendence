import { useState } from "react";
import Style from "./Sign_up_in.module.css";
import { motion, useAnimation } from "framer-motion";
import Auth from "./auth/Auth";

type props = {
  onData: Function;
  Sign_in_up: string;
};

export default function Sign_up_in(props: props) {
  const [isSignIn, setSignIn] = useState(false);
  const controls = useAnimation();

  const turnSwitch = () => {
    setSignIn(!isSignIn);
    props.onData(isSignIn);
    controls.start(isSignIn ? "false" : "true");
  };

  return (
    <div className={Style.inputs}>
      <div className={Style.slideBtn}>
        <p
          className={`${Style.signUpTxt} ${isSignIn ? "" : Style.On}`}
          onClick={turnSwitch}
        >
          Sign up
        </p>
        <p
          className={`${Style.signInTxt} ${isSignIn ? Style.On : ""}`}
          onClick={turnSwitch}
        >
          Sign in
        </p>
        <motion.div
          className={Style.subSlideBtn}
          transition={{ type: "spring", stiffness: 600, damping: 35 }}
          animate={controls}
          variants={{
            true: { x: "100%" },
            false: { x: "0%" },
          }}
        ></motion.div>
      </div>
      <Auth Sign_in_up={props.Sign_in_up}/>
    </div>
  );
}
