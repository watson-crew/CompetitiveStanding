import { useEffect, useState } from "react"
import { User } from "schema"
import { Button, PlayerSelectionCard, Text, StateDispatcher } from "ui"
import { useDispatch } from 'react-redux'
import { addRecentlyPlayed } from '@src/store/reducers/playerSlice'
import RecentPlayers from "../RecentPlayers/RecentPlayers"
import { stringify } from "querystring"
import internal from "stream"

type PlayerSelectionProps = {
  fetchPlayer: (id: string) => Promise<User>
}

type PlayerSelectionDispatchers = {
  set: StateDispatcher<User | undefined>
  errored: StateDispatcher<boolean>
  loading: StateDispatcher<boolean>
}

export default function PlayerSelection({ fetchPlayer }: PlayerSelectionProps) {
  const dispatch = useDispatch()

  const numPlayers = 2

  // Initialise values
  const initialPlayers: Record<number, User | undefined> = {}
  const initialLoading: Record<number, boolean> = {}
  const initialErrors: Record<number, boolean> = {}
  for (let i = 0; i < numPlayers; i++) {
    initialPlayers[i] = undefined
    initialLoading[i] = false
    initialErrors[i] = false
  }

  // Create states that can handle multiple players
  const [players, setPlayers] = useState<Record<number, User | undefined>>(initialPlayers)
  const [loading, setLoading] = useState<Record<number, boolean>>(initialLoading)
  const [errors, setErrors] = useState<Record<number, boolean>>(initialErrors)

  // Functions to edit states
  const setPlayer = (id: number, player?: User) => {
    const existing = players
    existing[id] = player
    setPlayers({...existing})
  }

  const setLoadingForPlayer = (id: number, isLoading: boolean) => {
    const existingLoading = loading
    existingLoading[id] = isLoading
    setLoading({...existingLoading})
  }

  const setErrorForPlayer = (id: number, isError: boolean) => {
    const existingErrors = errors
    existingErrors[id] = isError
    setErrors({...existingErrors})
  }

  const clearPlayer = (id: number) => {
    setPlayer(id, undefined)
    setErrorForPlayer(id, false)
    setLoadingForPlayer(id, false)
  }

  const onIdSet = async (id: number, memorableId: string) => {
    setLoadingForPlayer(id, true)

    try {
      setPlayer(id, await fetchPlayer(memorableId))
      setErrorForPlayer(id, false)
    } catch (err) {
      setErrorForPlayer(id, true)
    } finally {
      setLoadingForPlayer(id, false)
    }
  }

  const startGame = () => {
    console.log("Starting game...")
    Object.values(players).forEach(player => {
      dispatch(addRecentlyPlayed(player!))
    })
  }

  // Dynamically create list of player selection cards
  // const PlayerSelectionCards = (): any[] => {
  //   const cards = []
  //   for (let index = 0; index < numPlayers; index++) {
  //     cards.push(
  //       <PlayerSelectionCard
  //         title="Player {index}"
  //         player={players[index]}
  //         loading={loading[index]}
  //         isError={errors[index]}
  //         onIdSubmitted={memorableId => onIdSet(index, memorableId)}
  //         clearPlayer={() => clearPlayer(index)}
  //         className="basis-2/5 min-h-full"
  //       />
  //     )
  //   }
  //   return cards;
  // }

  // let playerSelectionCards: any[] = PlayerSelectionCards()

  // Check if all players have been selected
  const allPlayersSelected = () => {
    return Object.values(players).every((player) => player != undefined)
  }

  // For RecentlySelected logic
  const nextFreePlayerSlot = () => {
    let nextFreePlayerIndex = -1;
    for (let i = 0; i < numPlayers; i++) {
      if (players[i] == undefined) {
        nextFreePlayerIndex = i;
        break;
      }
    }
    return nextFreePlayerIndex;
  }
  const onSelected = (user: User) => {
    // Set player in first free space
    // TODO: Disable this if all the players have been selected, i.e no free slot
    setPlayer(nextFreePlayerSlot(), user);
  }

  return (
    <section className="w-full my-20">
      <section className="flex w-full justify-around align-middle items-center min-h-full h-full">
      <PlayerSelectionCard
          title="Player 1"
          player={players[0]}
          loading={loading[0]}
          isError={errors[0]}
          onIdSubmitted={memorableId => onIdSet(0, memorableId)}
          clearPlayer={() => clearPlayer(0)}
          className="basis-2/5 min-h-full"
        />

        <Text type="p">VS</Text>

        <PlayerSelectionCard
          title="Player 2"
          player={players[1]}
          loading={loading[1]}
          isError={errors[1]}
          onIdSubmitted={memorableId => onIdSet(1, memorableId)}
          clearPlayer={() => clearPlayer(1)}
          className="basis-2/5 min-h-full"
        />
      </section>
      <div className="text-center my-20">
        {
          allPlayersSelected() &&
          <Button text="Start Game" onClick={startGame}/>
        }
      </div>
      <RecentPlayers onSelected={onSelected}/>
    </section>
  )
}