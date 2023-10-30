import Style from "./Section4.module.css";
import Div from "./Div/Div";
import { useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Titles {
  firstTitlePos: "left";
  secondTitlePos: "center";
  thirdTitlePos: "right";
}

export default function Section3() {
  const [pos, setpos] = useState({
    firstTitlePos: "left",
    secondTitlePos: "center",
    thirdTitlePos: "right",
  });

  const [oldPos, setOldPos] = useState({
    firstTitlePos: "left",
    secondTitlePos: "center",
    thirdTitlePos: "right",
  });

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      const isDown = e.deltaY > 0;
      if (!isDown) {
        document.getElementById("link2")?.click();
      }
    };
    document
      .getElementById("section4")
      ?.addEventListener("wheel", handleScroll);

    return () =>
      document
        .getElementById("section4")
        ?.removeEventListener("wheel", handleScroll);
  }, []);

  const swapTitles = (title: string) => {
    // console.log("pos", pos, "title :", title);
    if (title == "first") {
      if (pos.firstTitlePos == "left") {
        if (pos.secondTitlePos == "center")
          setpos({
            firstTitlePos: "center",
            secondTitlePos: "right",
            thirdTitlePos: "left",
          });
        else
          setpos({
            firstTitlePos: "center",
            secondTitlePos: "left",
            thirdTitlePos: "right",
          });
      } else if (pos.firstTitlePos == "right") {
        if (pos.secondTitlePos == "center")
          setpos({
            firstTitlePos: "center",
            secondTitlePos: "left",
            thirdTitlePos: "right",
          });
        else
          setpos({
            firstTitlePos: "center",
            secondTitlePos: "right",
            thirdTitlePos: "left",
          });
      }
    } else if (title == "second") {
      if (pos.secondTitlePos == "left") {
        if (pos.firstTitlePos == "center")
          setpos({
            firstTitlePos: "right",
            secondTitlePos: "center",
            thirdTitlePos: "left",
          });
        else
          setpos({
            firstTitlePos: "left",
            secondTitlePos: "center",
            thirdTitlePos: "right",
          });
      } else if (pos.secondTitlePos == "right") {
        if (pos.firstTitlePos == "center")
          setpos({
            firstTitlePos: "left",
            secondTitlePos: "center",
            thirdTitlePos: "right",
          });
        else
          setpos({
            firstTitlePos: "right",
            secondTitlePos: "center",
            thirdTitlePos: "left",
          });
      }
    } else if (title == "third") {
      if (pos.thirdTitlePos == "left") {
        if (pos.secondTitlePos == "center")
          setpos({
            firstTitlePos: "left",
            secondTitlePos: "right",
            thirdTitlePos: "center",
          });
        else
          setpos({
            firstTitlePos: "right",
            secondTitlePos: "left",
            thirdTitlePos: "center",
          });
      } else if (pos.thirdTitlePos == "right") {
        if (pos.secondTitlePos == "center")
          setpos({
            firstTitlePos: "right",
            secondTitlePos: "left",
            thirdTitlePos: "center",
          });
        else
          setpos({
            firstTitlePos: "left",
            secondTitlePos: "right",
            thirdTitlePos: "center",
          });
      }
    }
    if (
      (title == "third" && pos.thirdTitlePos != "center") ||
      (title == "second" && pos.secondTitlePos != "center") ||
      (title == "first" && pos.firstTitlePos != "center")
    )
      setOldPos(pos);
  };

  const phoneSwap = (side: string) => {
    if (side == "left") {
      if (pos.firstTitlePos == "left") swapTitles("first");
      else if (pos.secondTitlePos == "left") swapTitles("second");
      else swapTitles("third");
    } else if (side == "right") {
      if (pos.firstTitlePos == "right") swapTitles("first");
      else if (pos.secondTitlePos == "right") swapTitles("second");
      else swapTitles("third");
    }
  };

  return (
    <section className={Style.container} id="section4">
      <div className={Style.titleSpace}>
        <div className={Style.titles}>
          <div
            className={`${Style.title} 
          ${pos.firstTitlePos == "left" && `${Style.left}`} 
          ${pos.firstTitlePos == "center" && `${Style.center}`} 
          ${pos.firstTitlePos == "right" && `${Style.right}`}
          ${
            oldPos.firstTitlePos == "right" &&
            `${
              pos.firstTitlePos == "center"
                ? `${Style.RightCenter}`
                : `${Style.RightLeft}`
            }`
          }
          ${
            oldPos.firstTitlePos == "left" &&
            `${
              pos.firstTitlePos == "center"
                ? `${Style.LeftCenter}`
                : `${Style.LeftRight}`
            }`
          }
          ${
            oldPos.firstTitlePos == "center" &&
            `${
              pos.firstTitlePos == "left"
                ? `${Style.CenterLeft}`
                : `${Style.CenterRight}`
            }`
          }`}
            onClick={() => swapTitles("first")}
          >
            <span></span>
            <h3>how to play the game ?</h3>
          </div>
          <div
            className={`${Style.title} 
          ${pos.secondTitlePos == "left" && `${Style.left}`} 
          ${pos.secondTitlePos == "center" && `${Style.center}`} 
          ${pos.secondTitlePos == "right" && `${Style.right}`}
          ${
            oldPos.secondTitlePos == "right" &&
            `${
              pos.secondTitlePos == "center"
                ? `${Style.RightCenter}`
                : `${Style.RightLeft}`
            }`
          }
          ${
            oldPos.secondTitlePos == "left" &&
            `${
              pos.secondTitlePos == "center"
                ? `${Style.LeftCenter}`
                : `${Style.LeftRight}`
            }`
          }
          ${
            oldPos.secondTitlePos == "center" &&
            `${
              pos.secondTitlePos == "left"
                ? `${Style.CenterLeft}`
                : `${Style.CenterRight}`
            }`
          }`}
            onClick={() => swapTitles("second")}
          >
            <h3>how to invite friends ?</h3>
          </div>
          <div
            className={`${Style.title} 
          ${pos.thirdTitlePos == "left" && `${Style.left}`} 
          ${pos.thirdTitlePos == "center" && `${Style.center}`} 
          ${pos.thirdTitlePos == "right" && `${Style.right}`}
          ${
            oldPos.thirdTitlePos == "right" &&
            `${
              pos.thirdTitlePos == "center"
                ? `${Style.RightCenter}`
                : `${Style.RightLeft}`
            }`
          }
          ${
            oldPos.thirdTitlePos == "left" &&
            `${
              pos.thirdTitlePos == "center"
                ? `${Style.LeftCenter}`
                : `${Style.LeftRight}`
            }`
          }
          ${
            oldPos.thirdTitlePos == "center" &&
            `${
              pos.thirdTitlePos == "left"
                ? `${Style.CenterLeft}`
                : `${Style.CenterRight}`
            }`
          }`}
            onClick={() => swapTitles("third")}
          >
            <h3>how to enable 2fa ?</h3>
          </div>
        </div>
      </div>
      <div className={Style.answer}>
        {pos.firstTitlePos == "center" && (
          <Div
            leftImg="/img/section4/controller.png"
            rightImg="/img/section4/arcadeMachine.png"
            text="use the arrow keys or mouse to move the paddle up and down and redirect the ball "
          />
        )}
        {pos.secondTitlePos == "center" && (
          <Div
            leftImg="/img/section4/rocket.png"
            rightImg="/img/section4/prize.png"
            text="go to the + button in direct chat and add you friend using his username"
          />
        )}
        {pos.thirdTitlePos == "center" && (
          <Div
            leftImg="/img/section4/wtfBro.png"
            rightImg="/img/section4/gay.png"
            text="go to account parametters slect enable and scan the qr code"
          />
        )}
      </div>
      <div className={Style.switch}>
        <span
          className={Style.leftArrow}
          onClick={() => phoneSwap("left")}
        ></span>
        <span
          className={Style.rightArrow}
          onClick={() => phoneSwap("right")}
        ></span>
      </div>
    </section>
  );
}

/* <Div
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
/> */
