import { twMerge } from "tailwind-merge"
import Card from "../../atoms/Card/Card"
import Text from "../../atoms/Text/Text"
import TopPlayersCard from "../../molecules/TopPlayerCard/TopPlayerCard"
import { topPlayerCardType } from "../../molecules/TopPlayerCard/TopPlayerCard"
import { WithDefaultProps, WithLoadingProps } from "../../types"
import { RankedPlayer } from 'schema'


type TopPlayersOverviewProps = WithDefaultProps<WithLoadingProps<{
  rankedPlayers: RankedPlayer[]
}>>

export default function TopPlayersOverview({ rankedPlayers, className, loading }: TopPlayersOverviewProps) {

  // TODO: Refactor this
  const cardsToRender: JSX.Element[] = []

  const cardDetailsToRender = [
    {
      rankedPlayer: rankedPlayers[0],
      cardType: topPlayerCardType.FIRST
    },
    {
      rankedPlayer: rankedPlayers[1],
      cardType: topPlayerCardType.SECOND
    },
    {
      rankedPlayer: rankedPlayers[2],
      cardType: topPlayerCardType.THIRD
    }
  ]

  cardDetailsToRender.forEach(details => {
    if (loading || !details.rankedPlayer)
    {
      cardsToRender.push(<TopPlayersCard loading={true} cardType={details.cardType}/>)
    } else {
      cardsToRender.push(<TopPlayersCard rankedPlayer={details.rankedPlayer} loading={false} cardType={details.cardType}/>)
    }

  });

  return (
    <Card className={twMerge("w-full h-full pt-2 flex flex-col", className)} color="blue-100">
      <Text type="h2">Who&apos;s on top</Text>
      <section className="w-full h-full grid grid-rows-6 grid-flow-col gap-1 overflow-auto">
        {cardsToRender}
      </section>
    </Card>
  )
}