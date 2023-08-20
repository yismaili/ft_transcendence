import Image from "next/image";
import Link from "next/link";
import Style from './Nav.module.css'

export default function Nav() {
    return (
        <header>
            <ul className={Style.container}>
                <li className={Style.imageRes}>
                    <Image 
                    quality={100}
                    className={Style.imageRes} 
                    width={75}
                    height={75}
                    src="/logo.png" alt="logo for pong game" 
                    priority={true}/>
                </li>
                <li>
                    <h1 className={Style.title}>PONG</h1>
                </li>
                <li>
                    <Link href="#">home</Link>
                    <Link href="#">about</Link>
                    <Link href="#">faq</Link>
                    <Link href="#">Sign up</Link>
                </li>
            </ul>
        </header>
    );
};