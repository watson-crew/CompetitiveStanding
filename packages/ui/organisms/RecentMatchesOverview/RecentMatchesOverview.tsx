import { LoadingProps, WithDefaultProps } from "../../types";
import Card from "../../atoms/Card/Card";
import ResultCard from "../../molecules/ResultCard.tsx/ResultCard";
import { twMerge } from "tailwind-merge";
import Text from "../../atoms/Text/Text";


type RecentMatchesOverviewProps = WithDefaultProps<LoadingProps>

export default function RecentMatchesOverview({ loading, className }: RecentMatchesOverviewProps) {

  let cardsToRender: JSX.Element[] = []

  if (loading) {
    const skeletonsToRender = 8
    cardsToRender = new Array(skeletonsToRender).fill(undefined).map((_, i) => <ResultCard key={i} loading={loading} className="" />)
  }

  return (
  <Card color="slate-200" className={twMerge("w-full h-full flex flex-col", className)}>
    <Text type="h2">Recent matches</Text>
    <div className="w-full h-full flex flex-col gap-2 mt-2 overflow-scroll">{cardsToRender}</div>
  </Card>
  )
}