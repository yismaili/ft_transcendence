'use client'
import Image from "next/image";
import Style from "./Section3.module.css"
import { useEffect, useState } from "react";

interface props {
    className: string;
}

export default function Section2(props: props) {

    const [screenSize, setScreenSize] = useState(getCurrentDimension());
    function getCurrentDimension(){
        return {
              width: window.innerWidth,
              height: window.innerHeight
        }
    }

    useEffect(() => {
        const updateDimension = () => {
              setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);

    
        return(() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])

    return (
        <section className={props.className}>
            <div className={Style.container}>
                <div className={Style.group}>
                    <div className={Style.ParentDiv}>
                        <div className={Style.side__icons}>
                            <Image
                                src="/img/section3/markman.png"
                                alt="a game image"
                                quality={100}
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 23vw"
                                width={screenSize.width}
                                height={screenSize.height}
                                className={Style.side__icons__btn__icon}
                            />
                        </div>
                        {/* <div className={Style.arrow_container}> */}
                            <div className={Style.side__icons2}>
                                <Image
                                        src="/img/section3/arrow.png"
                                        alt="a game image"
                                        quality={100}
                                        width={screenSize.width}
                                        height={screenSize.height}
                                        className={Style.side__icons__btn__icon}
                                    />
                            {/* </div> */}
                        </div>
                        <h2>El Amine El Mountassir</h2>
                        <p>Front End Dev</p>
                    </div>
                    <div>
                        <div className={Style.side__icons}>
                            <Image
                                src="/img/section3/alouane04.png"
                                alt="a game image"
                                quality={100}
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 23vw"
                                fill
                                className={Style.side__icons__btn__icon}
                            />
                        </div>
                        <div className={Style.errow}></div>
                        <h2>Ali Achraf Riahi</h2>
                        <p>Front End Dev</p>
                    </div>
                    <div>
                        <div className={Style.side__icons}>
                            <Image
                                src="/img/section3/dexter.png"
                                alt="a game image"
                                quality={100}
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 23vw"
                                fill
                                className={Style.side__icons__btn__icon}
                            />
                        </div>
                        <div className={Style.errow}></div>
                        <h2>Younes Ismaili</h2>
                        <p>Back End Dev</p>
                    </div>
                </div>
                <div>
                    <div className={Style.scrollElm}></div>
                    <div className={Style.scrollElm}></div>
                </div>
            </div>
        </section>
    );
}


// <div className={Style.container}>
//                 <div className={Style.friend}>
//                     <div className={Style.side__icons}>
//                         <Image
//                         src="/img/game.png"
//                         alt="a game image"
//                         quality={100}
//                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                         fill
//                         className={Style.side__icons__btn__icon}
//                         />
//                     </div>
//                     <div>
//                         <div className={Style.scrollElm}></div>
//                         <div className={Style.scrollElm}></div>
//                     </div>
//                 </div>
//             </div>