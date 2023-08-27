
import AboutUs from "./AboutUs/AboutUs";
import Style from "./Section3.module.css";

export default function Section3() {
  return (
    <section className={Style.container}>
		<AboutUs/>
		<AboutUs/>
		<AboutUs/>
		<div>
			<div className={Style.scrollElm}></div>
			<div className={Style.scrollElm}></div>
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
