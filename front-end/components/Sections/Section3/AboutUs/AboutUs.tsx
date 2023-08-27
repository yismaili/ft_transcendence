import Image from "next/image";
import "./AboutUs.css";

interface props {
  src: string;
  name: string;
  title: string;
}

export default function AboutUs(props: props) {
  return (
    <div className="ParentDiv">
      <div className="imageDiv">
        <Image
          src={props.src}
          alt="a game image"
          quality={100}
          sizes="(max-width: 744px) 100%, (max-width: 1200px) 100%, 100%"
          priority={true}
          width={100}
          height={100}
          className="image"
        />
      </div>
      <div className="imageDiv2">
        <Image
          src="/img/section3/arrow.png"
          alt="a game image"
          quality={100}
          sizes="(max-width: 744px) 50vw, (max-width: 1200px) 25vw, 100vw"
          width={100}
          height={100}
          className="image"
        />
      </div>
      <div className="textContainer">
        <h2 className="name">{props.name}</h2>
        <p className="title">{props.title}</p>
      </div>
    </div>
  );
}
