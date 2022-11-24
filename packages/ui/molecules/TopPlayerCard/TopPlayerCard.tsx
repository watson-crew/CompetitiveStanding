import Skeleton from "react-loading-skeleton"
import { twMerge } from "tailwind-merge"
import Card from "../../atoms/Card/Card"
import { WithDefaultProps } from "../../types"


type TopPlayersCardProps = WithDefaultProps<{
  playerName: string
  isLoading: boolean
}>

export default function TopPlayersCard({ playerName, isLoading, className }: TopPlayersCardProps) {

  return (
    <div className={twMerge("mx-auto w-full rounded-md border border-blue-300 p-4 shadow", className)}>
      <div className="flex animate-pulse space-x-4">
        <div className="h-10 w-10 rounded-full bg-slate-700"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-slate-700"></div>
        </div>
      </div>
    </div>
  );
}