import { twMerge } from "tailwind-merge"
import Card from "../../atoms/Card/Card"
import Text from "../../atoms/Text/Text"
import TopPlayersCard from "../../molecules/TopPlayerCard/TopPlayerCard"
import { WithDefaultProps, WithLoadingProps } from "../../types"
import { RankedPlayer } from 'schema'


type TopPlayersOverviewProps = WithDefaultProps<WithLoadingProps<{
  rankedPlayers: RankedPlayer[]
}>>

export default function TopPlayersOverview({ rankedPlayers, className, loading }: TopPlayersOverviewProps) {

  // TODO: Refactor this
  let cardsToRender: JSX.Element[] = []

  const cardDetailsToRender = [
    {
      rankingDetails: rankedPlayers[0],
      className: "row-span-6 col-span-2 bg-yellow-400"
    },
    {
      rankingDetails: rankedPlayers[1],
      className: "row-span-4 col-span-1 bg-gray-500"
    },
    {
      rankingDetails: rankedPlayers[2],
      className: "row-span-2 col-span-1 bg-yellow-700"
    }
  ]

  cardDetailsToRender.forEach(details => {
    if (loading || !details.rankingDetails)
    {
      cardsToRender.push(<TopPlayersCard loading={true} className={details.className}/>)
    } else {
      cardsToRender.push(<TopPlayersCard player={details.rankingDetails.player!} loading={false} className={details.className}/>)
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