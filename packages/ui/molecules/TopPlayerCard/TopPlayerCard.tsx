import React from 'react';
import { twMerge } from 'tailwind-merge';
import Card from '../../atoms/Card/Card';
import Text from '../../atoms/Text/Text';
import PlaysAndWinsResults from '../PlaysAndWinsResults/PlaysAndWinsResults';
import { WithDefaultProps, WithLoadingProps } from '../../types';
import { RankedPlayer, User } from 'schema';
import Image from 'next/image';

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
  [topPlayerCardType.FIRST]: 'row-span-6 col-span-2 bg-yellow-400',
  [topPlayerCardType.SECOND]: 'row-span-4 col-span-1 bg-gray-500',
  [topPlayerCardType.THIRD]: 'row-span-2 col-span-1 bg-yellow-700',
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

  if (loading) {
    return renderWithChildren(TopPlayersCardStateContent());
  }

  const player = rankedPlayer?.player;
  const getFullName = (player: User) =>
    `${player.firstName} ${player.lastName}`;
  const fullName = (player && getFullName(player)) ?? '';
  const imageUrl =
    player?.profilePicture ??
    'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';

  return renderWithChildren(
    <>
      <div className="flex">
        <div className="relative h-12 w-12">
          <Image
            src={imageUrl}
            alt={`${fullName}'s picture`}
            fill={true}
            sizes=""
            className="rounded-full"
          />
        </div>

        <section className="pl-5">
          <Text type="h3" className="text-sky-500 dark:text-sky-400">
            {fullName}
          </Text>
          <Text type="p" className="font-bold text-[#ff3e00]">
            {player?.memorableId}
          </Text>
        </section>
      </div>

      <PlaysAndWinsResults
        gamesPlayed={rankedPlayer!.gamesPlayed!}
        gamesWon={rankedPlayer!.wins!}
        fullVersion={cardType == topPlayerCardType.FIRST}
        className="flex self-end"
      />
    </>,
  );
}
