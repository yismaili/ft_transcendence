import GameMaps from "@/components/gameMap/game_maps/game_maps";
import "@/global_css/utilityClasses.css";
import "@/components/gameMap/page.css";
import "@/styles/global.css";

export default function Game() {
  return (
    <div className="container Game">
      <GameMaps />
      <div className="Game__map__Confirmation"/>
    </div>
  );
}
