import { PlayerIdInput, WithDefaultProps, Card } from "ui"
import { twMerge } from 'tailwind-merge'

import { useState } from "react"
import PlayerCard from "@molecules/PlayerCard/PlayerCard"


type PlayerSelectionCardProps = WithDefaultProps<{}>

export default function PlayerSelectionCard({}: PlayerSelectionCardProps) {
  const title = "Test player title"
  const [playerId, setPlayerId] = useState('')
  const className = "" // TODO: Fill this in with something from parent component
  const containerClasses = twMerge("bg-slate-100 w-full min-h-full h-full flex justify-center items-center flex-col", className)

  const onIdSubmitted = (id: string) => {
    setPlayerId(id)
  }

  const clearPlayer = () => {
    setPlayerId('')
  }

  return (
    <Card className={containerClasses}>
      {!playerId && <PlayerIdInput title={title} onChange={id => onIdSubmitted(id)} /> }
      {playerId &&
        <PlayerCard playerId={playerId} onClose={clearPlayer} />
      }
    </Card>
  )
}