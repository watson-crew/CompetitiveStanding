import { WithDefaultProps } from "../../types";
import { GameType } from 'schema'
import { twMerge } from "tailwind-merge";

// Remove partial later on
type GameSelectCardProps = WithDefaultProps<Partial<GameType>>

export default function GameSelectCard({ name, maxNumberOfPlayers, className }: GameSelectCardProps) {


  return (
    <div className={twMerge("mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4 shadow my-2", className)}>
      <div className="flex animate-pulse space-x-4">
        <div className="h-12 w-12 rounded-full bg-slate-700"></div>
      </div>
      <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-slate-700"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-slate-700"></div>
              <div className="col-span-1 h-2 rounded bg-slate-700"></div>
            </div>
            <div className="h-2 rounded bg-slate-700"></div>
          </div>
        </div>
    </div>
  )
}