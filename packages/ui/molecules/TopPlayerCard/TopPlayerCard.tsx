import React from "react"
import { twMerge } from "tailwind-merge"
import Card from "../../atoms/Card/Card"
import Text from "../../atoms/Text/Text"
import { WithDefaultProps, WithLoadingProps } from "../../types"


type TopPlayersCardProps = WithDefaultProps<WithLoadingProps<{
  playerName: string
}>>

function TopPlayersCardStateContent() {
  return (
    <div className="flex animate-pulse space-x-4">
      <div className="h-10 w-10 rounded-full bg-slate-700"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 rounded bg-slate-700"></div>
      </div>
    </div>
  )
}


export default function TopPlayersCard({ className, loading }: TopPlayersCardProps) {

  const renderWithChildren = (children: React.ReactNode) => React.createElement(Card, { className: twMerge('w-full', className) }, children)

  if (loading) {
    return renderWithChildren(TopPlayersCardStateContent())
  }

  return renderWithChildren(
    <>
      <Text type='p'>Actual card content here</Text>
    </>
  )
}