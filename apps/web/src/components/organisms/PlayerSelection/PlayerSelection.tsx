import { useState } from "react"
import { User } from "schema"
import { Button, Text, StateDispatcher } from "ui"
import PlayerSelectionCard from "@molecules/PlayerSelectionCard/PlayerSelectionCard"

type PlayerSelectionProps = {
  fetchPlayer: (id: string) => Promise<User>
}

type PlayerSelectionDispatchers = {
  set: StateDispatcher<User | undefined>
  errored: StateDispatcher<boolean>
  loading: StateDispatcher<boolean>
}

export default function PlayerSelection({ fetchPlayer }: PlayerSelectionProps) {

  const [playerOne, setPlayerOne] = useState<User>()
  const [playerOneErrored, setPlayerOneErrored] = useState(false)
  const [playerOneLoading, setPlayerOneLoading] = useState(false)
  const playerOneDispatchers: PlayerSelectionDispatchers = {
    set: setPlayerOne,
    errored: setPlayerOneErrored,
    loading: setPlayerOneLoading
  }

  const [playerTwo, setPlayerTwo] = useState<User>()
  const [playerTwoErrored, setPlayerTwoErrored] = useState(false)
  const [playerTwoLoading, setPlayerTwoLoading] = useState(false)
  const playerTwoDispatchers: PlayerSelectionDispatchers = {
    set: setPlayerTwo,
    errored: setPlayerTwoErrored,
    loading: setPlayerTwoLoading
  }

  const clearPlayer = ({ set, errored, loading }: PlayerSelectionDispatchers) => {
    set(undefined)
    errored(false)
    loading(false)
  }

  const onIdSet = async (id: string, {set, loading, errored}: PlayerSelectionDispatchers) => {

    loading(true)

    try {
      set(await fetchPlayer(id))
      errored(false)
    } catch (err) {
      errored(true)
    } finally {
      loading(false)
    }
  }

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