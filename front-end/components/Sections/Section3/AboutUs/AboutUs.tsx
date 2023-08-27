import Image from "next/image";
import Style from "./AboutUs.module.css";

export default function AboutUs() {
  return (
    <div className={Style.ParentDiv}>
      <div className={Style.imageDiv}>
        <Image
          src="/img/section3/markman.png"
          alt="a game image"
          quality={100}
          sizes="(max-width: 744px) 50vw, (max-width: 1200px) 25vw, 100vw"
          width={100}
          height={100}
          className={Style.image}
        />
      </div>
      <div className={Style.imageDiv2}>
        <Image
          src="/img/section3/arrow.png"
          alt="a game image"
          quality={100}
          sizes="(max-width: 744px) 50vw, (max-width: 1200px) 25vw, 100vw"
          width={100}
          height={100}
          className={Style.image2}
        />
      </div>
      <h2>El Amine El Mountassir</h2>
      <p>Front End Dev</p>
    </div>
  );
}
