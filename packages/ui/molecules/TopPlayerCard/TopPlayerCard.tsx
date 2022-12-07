import React from 'react';
import { twMerge } from 'tailwind-merge';
import Card from '../../atoms/Card/Card';
import TopPlayerStats from '../TopPlayerStats/TopPlayerStats';
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

const classNamesForCards: Record<
  topPlayerCardType,
  { root?: string; stats?: string }
> = {
  [topPlayerCardType.FIRST]: {
    root: 'bg-yellow-400',
  },
  [topPlayerCardType.SECOND]: { root: 'bg-gray-400' },
  [topPlayerCardType.THIRD]: {
    root: 'bg-yellow-600',
  },
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
        className: twMerge(
          'flex flex-col w-full',
          className,
          classNamesToUse.root,
        ),
      },
      children,
    );

  if (loading || !rankedPlayer) {
    return renderWithChildren(TopPlayersCardStateContent());
  }

  const isFullVersion = cardType == topPlayerCardType.FIRST;

  return renderWithChildren(
    <section className="flex h-full items-center rounded-xl bg-opacity-30 p-2">
      <PlayerCard
        className="w-2/5 flex-col-reverse p-0 md:p-0"
        player={rankedPlayer.player}
        variant={isFullVersion ? 's' : 'xs'}
      />

      <TopPlayerStats
        {...rankedPlayer}
        fullVersion={isFullVersion}
        className={twMerge('mx-5 w-3/5')}
      />
    </section>,
  );
}
