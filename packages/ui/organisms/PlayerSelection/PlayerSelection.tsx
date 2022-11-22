import { useState } from "react"
import { User } from "schema"
import { Button } from "../../atoms/Button/Button"
import Text from "../../atoms/Text/Text"
import PlayerSelectionCard from "../../molecules/PlayerSelectionCard/PlayerSelectionCard"
import { StateDispatcher } from "../../types"

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
        <PlayerSelectionCard 
          title="Player 1" 
          player={playerOne} 
          loading={playerOneLoading}
          isError={playerOneErrored}
          onIdSubmitted={id => onIdSet(id, playerOneDispatchers)} 
          clearPlayer={() => clearPlayer(playerOneDispatchers)}
          className="basis-2/5 min-h-full"
        />

        <Text type="p">VS</Text>

        <PlayerSelectionCard 
          title="Player 2" 
          player={playerTwo} 
          loading={playerTwoLoading}
          isError={playerTwoErrored}
          onIdSubmitted={id => onIdSet(id, playerTwoDispatchers)} 
          clearPlayer={() => clearPlayer(playerTwoDispatchers)}
          className="basis-2/5 min-h-full"
        />

      </section>
      <div className="text-center my-20">
        <Button text="Start Game" onClick={() => console.log('Start game')}/>
      </div>
    </section>
  )
}