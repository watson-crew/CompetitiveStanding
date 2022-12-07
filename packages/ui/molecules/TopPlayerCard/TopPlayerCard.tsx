import React from 'react';
import { twMerge } from 'tailwind-merge';
import Card from '../../atoms/Card/Card';
import PlaysAndWinsResults from '../PlaysAndWinsResults/PlaysAndWinsResults';
import { WithDefaultProps, WithLoadingProps } from '../../types';
import { RankedPlayer } from 'schema';
import PlayerCard from '../PlayerCard/PlayerCard';

export enum topPlayerCardType {
  FIRST,
  SECOND,
  THIRD,
}

type TopPlayersCardProps = WithDefaultProps<
  WithLoadingProps<{
    rankedPlayer?: RankedPlayer;
    cardType: topPlayerCardType;
  }>
>;

function TopPlayersCardStateContent() {
  return (
    <div className="flex animate-pulse space-x-4">
      <div className="h-10 w-10 rounded-full bg-slate-700"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 rounded bg-slate-700"></div>
      </div>
    </div>
  );
}

const classNamesForCards: Record<topPlayerCardType, string> = {
  [topPlayerCardType.FIRST]: 'bg-yellow-400',
  [topPlayerCardType.SECOND]: 'bg-gray-500',
  [topPlayerCardType.THIRD]: 'bg-yellow-700',
};

function classNames(type: topPlayerCardType) {
  return classNamesForCards[type];
}

export default function TopPlayersCard({
  rankedPlayer,
  className,
  loading,
  cardType,
}: TopPlayersCardProps) {
  const classNamesToUse = classNames(cardType);

  const renderWithChildren = (children: React.ReactNode) =>
    React.createElement(
      Card,
      {
        className: twMerge('flex flex-col w-full', className, classNamesToUse),
      },
      children,
    );

  if (loading || !rankedPlayer) {
    return renderWithChildren(TopPlayersCardStateContent());
  }

  const isFullVersion = cardType == topPlayerCardType.FIRST;

  return renderWithChildren(
    <section className="flex h-full items-center">
      <PlayerCard
        className="w-1/3 p-0 md:p-0"
        player={rankedPlayer.player}
        variant={isFullVersion ? 's' : 'xs'}
      />

      <PlaysAndWinsResults
        gamesPlayed={rankedPlayer.gamesPlayed}
        wins={rankedPlayer.wins}
        elo={rankedPlayer.elo}
        winPercentage={rankedPlayer.winPercentage}
        fullVersion={isFullVersion}
        className="w-1/2"
      />
    </section>,
  );
}
