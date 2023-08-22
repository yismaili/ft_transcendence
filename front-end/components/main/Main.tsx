import Section1 from "../Sections/Section1/Section1";
import Section2 from "../Sections/Section2/Section2";
import Style from "./Main.module.css"

export default function Main() {
    return (
        <main>
            <Section1 className={Style.pageWraper1}/>
            <Section2 className={Style.pageWraper2}/>
        </main>
    );
}