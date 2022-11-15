import { Game } from "../types";
import PlayerSection from "./PlayerSection";

type HeadToHeadSectionProps = {
  game: Game
};

export default function HeadToHeadSection({ game }: HeadToHeadSectionProps) {
  return (
    <div className="flex flex-row w-96 justify-evenly bg-slate-100">
      <PlayerSection player={game.player} challenger />
      <PlayerSection player={game.opponent} />
    </div>
  )
}