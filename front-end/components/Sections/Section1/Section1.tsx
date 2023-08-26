import Image from "next/image";
import Style from "./Section1.module.css"

interface props {
    className: string;
}

export default function Section1(props: props) {
    return (
        <section className={props.className}>
            <div className={Style.Main}>
                <h1 className={Style.title}>FUTURE OF <span>PONG</span> START NOW</h1>
                <button>PLAY NOW</button>
            </div>
            <div className={Style.MainImg}>
                <div className={Style.side__icons}>
                        <Image
                        src="/img/ball.png"
                        alt="a ping ball image"
                        priority={true}
                        quality={100}
                        fill
                        className={Style.side__icons__btn__icon}
                        />
                </div>
                <div className={Style.side__icons}>
                    <div className={Style.MoonBall}>
                        <Image
                        src="/img/moon.png"
                        alt="moon image"
                        priority={true}
                        quality={100}
                        fill
                        className={Style.side__icons__btn__icon}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}