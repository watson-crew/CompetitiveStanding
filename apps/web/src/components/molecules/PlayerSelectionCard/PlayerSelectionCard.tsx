import { User } from "schema"
import { Banner, Text, WithCloseButton, PlayerIdInput, WithDefaultProps, Card, LoadingSpinner } from "ui"
import { twMerge } from 'tailwind-merge'

import { useState, useContext } from "react"
import PlayerCard from "@molecules/PlayerCard/PlayerCard"

import useSWR from 'swr'
import { ApiContext } from '@src/context/ApiContext';

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

  // const apiClient = useContext(ApiContext)!;
  // const fetchUserFromApiClient = async (userId: string): Promise<User> => {
  //   const response = await apiClient.user.getUserByMemorableId(userId)
  //   return response.data
  // }

  // const fetchUser = (userId: string): any => {
  //   console.log("Fetching user from PlayerSelectionCard")
  //   return useSWR(
  //     `${userId}`,
  //     fetchUserFromApiClient,
  //     {
  //       dedupingInterval: 10000 // 10 seconds.
  //     }
  //   )
  // }

  return (
    <Card className={containerClasses}>
      {/* {isError && <Banner type="error" onClose={clearPlayer}><Text type="p">Oops an error occurred</Text></Banner>} */}
      {!playerId && <PlayerIdInput title={title} onChange={id => onIdSubmitted(id)} /> }
      {playerId &&
        <PlayerCard playerId={playerId} onClose={clearPlayer} />//fetchUser={fetchUser} />
      }
    </Card>
  )
}