import { useEffect, useState } from "react"
import { User } from "schema"
import Card from "../../atoms/Card/Card"
import Banner from "../../atoms/Banner/Banner"
import Text from "../../atoms/Text/Text"
import WithCloseButton from "../../atoms/WithCloseButton/WithCloseButton"
import PlayerCard from "../../molecules/PlayerCard/PlayerCard"
import PlayerIdInput from "../../molecules/PlayerIdInput/PlayerIdInput"
import { WithDefaultProps } from "../../types"


type PlayerSelectionCardProps = WithDefaultProps<{
  title: string
  player?: User
  loading: boolean
  onIdSubmitted: (id: string) => Promise<void>
  clearPlayer: () => any
  playerNotFound?: boolean
  isError?: boolean
}>

export default function PlayerSelectionCard({ title, player, playerNotFound, isError, loading, onIdSubmitted, clearPlayer }: PlayerSelectionCardProps) {

  if (loading) {
    return <p>Loading</p>
  }

  return (
    <div>
      {playerNotFound && <Banner type="info" onClose={clearPlayer}><Text type="p">No player exits for id</Text></Banner>}
      {isError && <Banner type="error" onClose={clearPlayer}><Text type="p">Oops an error occurred</Text></Banner>}
      {!player && <PlayerIdInput title={title} onChange={id => onIdSubmitted(id)} /> }
      {player && 
        <WithCloseButton onClose={clearPlayer}>
          <PlayerCard player={player} /> 
        </WithCloseButton>
      }
  </div>
  )
}