import Style from "./Section4.module.css";
import Div from "./Div/Div";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Section3() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <section className={Style.container} id="section4">
      <div className={Style.subContainer} ref={ref}>
        <Div
          y={useTransform(scrollYProgress, [0, 1], ["0%", "240%"])}
          opacity={useTransform(scrollYProgress, [0, .35], ["100%", "0%"])}
          leftImg="/img/section4/controller.png"
          rightImg="/img/section4/arcadeMachine.png"
          title="how to play the game ?"
          text="use the arrow keys or mouse to move the paddle up and down and redirect the ball "
        />
        <Div
          y={useTransform(scrollYProgress, [0, 1], ["-30%", "180%"])}
          opacity={useTransform(scrollYProgress, [.6, .8], ["100%", "0%"])}
          leftImg="/img/section4/rocket.png"
          rightImg="/img/section4/prize.png"
          title="how to fuck ?"
          text="use the arrow keys or mouse to move the paddle up and down and redirect the ball "
        />
        <Div
          y={useTransform(scrollYProgress, [0, 1], ["20%", "100%"])}
          opacity={useTransform(scrollYProgress, [0, 0], ["2", "1"])}
          leftImg="/img/section4/wtfBro.png"
          rightImg="/img/section4/gay.png"
          title="stranger thing okey ?"
          text="use the arrow keys or mouse to move the paddle up and down and redirect the ball "
        />
      </div>
    </section>
  );
}
