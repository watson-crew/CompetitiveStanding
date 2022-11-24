import { useState } from "react"
import { User } from "schema"
import { Button, Text, StateDispatcher } from "ui"
import PlayerSelectionCard from "@molecules/PlayerSelectionCard/PlayerSelectionCard"

type PlayerSelectionProps = {

}

export default function PlayerSelection({}: PlayerSelectionProps) {
  return (
    <section className="w-full my-20">
      <section className="flex w-full justify-around align-middle items-center min-h-full h-full">
        <PlayerSelectionCard />

        <Text type="p">VS</Text>

        <PlayerSelectionCard />

      </section>
      <div className="text-center my-20">
        <Button text="Start Game" onClick={() => console.log('Start game')}/>
      </div>
    </section>
  )
}