import Style from "./Section4.module.css";
import Div from "./Div/Div";

export default function Section3() {
  return (
    <section className={Style.container}>
      <Div
        leftImg="/img/section4/controller.png"
        rightImg="/img/section4/arcadeMachine.png"
        title="how to play the game ?"
        text="use the arrow keys or mouse to move the paddle up and down and redirect the ball "
      />
      {/* <Div
        leftImg="/img/section4/rocket.png"
        rightImg="/img/section4/prize.png"
        title="how to fuck ?"
        text="use the arrow keys or mouse to move the paddle up and down and redirect the ball "
      />
      <Div
        leftImg="/img/section4/wtfBro.png"
        rightImg="/img/section4/gay.png"
        title="stranger thing okey ?"
        text="use the arrow keys or mouse to move the paddle up and down and redirect the ball "
      /> */}
    </section>
  );
}
