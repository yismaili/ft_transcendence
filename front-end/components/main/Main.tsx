import Section1 from "../Sections/Section1";
import Style from "./Main.module.css"

export default function Main() {
    return (
        <main>
            <Section1 className={Style.pageWraper}/>
        </main>
    );
}