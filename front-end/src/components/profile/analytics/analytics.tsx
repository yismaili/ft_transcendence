import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "./analytics.css"

interface nums{
    user:User;
}

async function Analytics(prop:nums){
        return (<div className="analytics">
            <div className="data">
                <h3 className="data__title">total games</h3>
                <p className="data__value"> {prop.user.profile.score}</p>
            </div>
            <div className="data data__border">
                <h3 className="data__title">win</h3>
                <p className="data__value"> {prop.user.profile.win}</p>
            </div>
            <div className="data">
                <h3 className="data__title">loss</h3>
                <p className="data__value"> {prop.user.profile.los}</p>
            </div>
            <span className="xp__bar">{prop.user.profile.xp} %</span>
        </div>);
}

export default Analytics;