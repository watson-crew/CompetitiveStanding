import { useState } from "react";
import { Player } from "../../types";

type PlayerSectionProps = {
  player: Player,
  challenger?: Boolean
};

export default function PlayerSection({ player, challenger }: PlayerSectionProps) {
  const [score, setScore] = useState(0)
  const win = () => setScore(prev => prev+1)

  return (
    <div 
      onClick={() => win()}
      className={
        `flex ${challenger ? "flex-row" : "flex-row-reverse"} 
        flex-grow w-auto justify-between cursor-pointer`
      }>
      <span>{player.name}</span>
      <span>{score}{challenger ? <span>-</span> : null}</span>
    </div>
  )
}