import { User } from "schema"
import Banner from "../../atoms/Banner/Banner"
import Text from "../../atoms/Text/Text"
import WithCloseButton from "../../atoms/WithCloseButton/WithCloseButton"
import PlayerCard from "../../molecules/PlayerCard/PlayerCard"
import PlayerIdInput from "../../molecules/PlayerIdInput/PlayerIdInput"
import { WithDefaultProps } from "../../types"
import { twMerge } from 'tailwind-merge'
import Card from "../../atoms/Card/Card"
import LoadingSpinner from "../../atoms/LoadingSpinner/LoadingSpinner"

type PlayerSelectionCardProps = WithDefaultProps<{
  title: string
  player?: User
  loading: boolean
  onIdSubmitted: (id: string) => Promise<void>
  clearPlayer: () => any
  playerNotFound?: boolean
  isError?: boolean
}>

export default function PlayerSelectionCard({ title, player, playerNotFound, isError, loading, onIdSubmitted, clearPlayer, className}: PlayerSelectionCardProps) {

  const containerClasses = twMerge("bg-slate-100 w-full min-h-full h-full flex justify-center items-center flex-col", className)

  if (loading) {
    
    return (
      <Card className={containerClasses}>
        <LoadingSpinner />
      </Card>
    )
  }

  return (
    <Card className={containerClasses}>
      {playerNotFound && <Banner type="info" onClose={clearPlayer}><Text type="p">No player exits for id</Text></Banner>}
      {isError && <Banner type="error" onClose={clearPlayer}><Text type="p">Oops an error occurred</Text></Banner>}
      {!player && <PlayerIdInput title={title} subtitle="Enter your ID" onChange={id => onIdSubmitted(id)} /> }
      {player && 
        <WithCloseButton onClose={clearPlayer}>
          <PlayerCard player={player} /> 
        </WithCloseButton>
      }
  </Card>
  )
}