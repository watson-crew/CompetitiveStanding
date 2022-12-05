import dayjs from 'dayjs';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { PlayerCard } from '../..';
import { WithDefaultProps, WithLoadingProps } from '../../types';
import duration from 'dayjs/plugin/duration';
import { Team } from 'schema';
dayjs.extend(duration);

type TeamCardProps = WithDefaultProps<
  WithLoadingProps<{
    team?: Omit<Team, 'id'>;
    isWinningTeam: boolean;
  }>
>;

function TeamCardLoadingState() {
  return (
    <div className="flex w-fit animate-pulse flex-col gap-2">
      <div className="h-2 w-12 rounded-full bg-slate-700"></div>
      <div className="h-12 w-12 rounded-full bg-slate-700"></div>
    </div>
  );
}

export default function TeamCard({
  className,
  team,
  isWinningTeam,
  loading,
}: TeamCardProps) {
  if (loading) {
    return TeamCardLoadingState();
  }

  return (
    <section
      className={twMerge(`flex w-full justify-around rounded-xl`, className)}
    >
      {team?.players.map(player => (
        <PlayerCard
          key={player.memorableId}
          player={player}
          variant="xs"
          className="bg-none p-0 md:p-0"
          imageClassName={`${isWinningTeam ? '' : 'grayscale'}`}
          textClassName={`${isWinningTeam ? 'text-orange-600 font-bold' : ''}`}
        />
      ))}
    </section>
  );
}
