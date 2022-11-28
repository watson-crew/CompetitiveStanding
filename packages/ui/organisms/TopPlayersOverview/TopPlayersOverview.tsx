import { twMerge } from "tailwind-merge"
import Card from "../../atoms/Card/Card"
import Text from "../../atoms/Text/Text"
import TopPlayersCard from "../../molecules/TopPlayerCard/TopPlayerCard"
import { WithDefaultProps } from "../../types"


type TopPlayersOverviewProps = WithDefaultProps<unknown>

export default function TopPlayersOverview({ className }: TopPlayersOverviewProps) {


  return (
    <Card className={twMerge("w-full h-full pt-2 flex flex-col", className)} color="blue-100">
      <Text type="h2">Who&apos;s on top</Text>
      <section className="w-full h-full grid grid-rows-6 grid-flow-col gap-1 overflow-auto">
        <TopPlayersCard playerName="a" loading={true} className="row-span-6 col-span-2 bg-yellow-400" />
        <TopPlayersCard playerName="b" loading={true} className="row-span-4 col-span-1 bg-gray-500"/>
        <TopPlayersCard playerName="c" loading={true} className="row-span-2 col-span-1 bg-yellow-700"/>
      </section>
    </Card>
  )
}