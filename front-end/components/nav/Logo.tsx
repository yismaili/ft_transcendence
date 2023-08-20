import Image from "next/image";

export default function Logo() {
    return (
        <div>
            <Image src="/logo.png" alt="logo for pong game" height={100} width={100}></Image>
            <h1>PONG</h1>
        </div>
    );
}