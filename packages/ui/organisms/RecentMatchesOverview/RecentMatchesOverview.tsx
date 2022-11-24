import Skeleton from "react-loading-skeleton";
import { WithDefaultProps } from "../../types";
import 'react-loading-skeleton/dist/skeleton.css'
import Card from "../../atoms/Card/Card";
import ResultCard from "../../molecules/ResultCard.tsx/ResultCard";
import { twMerge } from "tailwind-merge";
import Text from "../../atoms/Text/Text";


type RecentMatchesOverviewProps = WithDefaultProps<{
  isLoading: boolean
}>

export default function RecentMatchesOverview({ isLoading, className }: RecentMatchesOverviewProps) {


  const count = 8


  const cardsToRender = []

  for (let i = 0; i < count; i++) {
    cardsToRender.push(<ResultCard key={i} />)
  }

  if (isLoading) {
    return (
    <Card color="slate-200" className={twMerge("w-full h-full flex flex-col overflow-scroll", className)}>
      <Text type="h2">Recent matches</Text>
      <div className="w-full h-full flex flex-col"> {cardsToRender}</div>
    </Card>

    
    )
  }

  return <></>
}