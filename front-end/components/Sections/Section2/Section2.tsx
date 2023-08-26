import Image from "next/image";
import Style from "./Section2.module.css"

interface props {
    className: string;
}

export default function Section2(props: props) {
    return (
        <section className={props.className}>
            <div className={Style.container}>
                <div className={Style.friend}>
                    <div className={Style.side__icons}>
                        <Image
                        src="/img/section2/game.png"
                        alt="a game image"
                        quality={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        className={Style.side__icons__btn__icon}
                        />
                    </div>
                    <div className={Style.txt}>
                        <p>We are a team of three student developers who are passionate, curious, and hardworking.</p>
                        <p>We are always eager to learn new things and love to solve problems.</p>
                    </div>
                <div>
                    <div className={Style.scrollElm}></div>
                    <div className={Style.scrollElm}></div>
                </div>
                </div>
            </div>
        </section>
    );
}