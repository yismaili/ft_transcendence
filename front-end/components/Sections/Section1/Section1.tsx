import Image from "next/image";
import Style from "./Section1.module.css"

interface props {
    className: string;
}

export default function Section1(props: props) {
    return (
        <section className={props.className}>
            <div className={Style.Main}>
                <h1>FUTURE OF <span>PONG</span></h1>
                <p>START NOW</p>
                <button>PLAY NOW</button>
            </div>
            <div className={Style.MainImg}>
                <div className={Style.BallImg}>
                    <Image
                    src="/img/ball.png"
                    alt="a ping ball image"
                    priority={true}
                    quality={100}
                    fill/>
                </div>
                <div className={Style.MoonImg}>
                    <Image
                    src="/img/moon.png"
                    alt="moon image"
                    priority={true}
                    quality={100}
                    fill/>
                </div>
            </div>
        </section>
    );
}