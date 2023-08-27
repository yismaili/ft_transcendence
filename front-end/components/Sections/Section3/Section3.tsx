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
