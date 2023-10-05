import GameMaps from "@/components/game/game_maps/game_maps"
import "@/global_css/utilityClasses.css"
import "@/components/game/page.css"

export default function Game() {
    return (<div className="container Game">
        <GameMaps />
            <div className="Game__map__Confirmation"></div>
    </div>);
}