import { twMerge } from 'tailwind-merge';
import { PlayerCard } from '../..';
import {
  TeamWithRatings,
  WithDefaultProps,
  WithLoadingProps,
} from '../../types';
import PlayerWithElo from '../PlayerWithElo/PlayerWithElo';

type TeamCardProps = WithDefaultProps<
  WithLoadingProps<{
    team?: TeamWithRatings;
    isWinningTeam: boolean;
    displayElos?: boolean;
    flipCard?: boolean;
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
  displayElos = false,
  flipCard = false,
}: TeamCardProps) {
  if (loading) {
    return TeamCardLoadingState();
  }

  return (
    <section
      className={twMerge(`flex w-full justify-around rounded-xl`, className)}
    >
      {!displayElos &&
        team?.players.map(player => (
          <PlayerCard
            key={`player-card-${player.memorableId}`}
            player={player}
            variant="xs"
            className="bg-none p-0 md:p-0"
            imageClassName={`${isWinningTeam ? '' : 'grayscale'}`}
            textClassName={`${
              isWinningTeam ? 'text-orange-600 font-bold' : ''
            }`}
          />
        ))}

      {displayElos &&
        team?.players.map(player => (
          <PlayerWithElo
            key={`player-card-${player.memorableId}`}
            player={player}
            className={`bg-none p-0 md:p-0 ${
              flipCard ? 'flex-row-reverse' : ''
            }`}
            imageClassName={`${isWinningTeam ? '' : 'grayscale'}`}
            textClassName={`${
              isWinningTeam ? 'text-orange-600 font-bold' : ''
            }`}
          />
        ))}
    </section>
  );
}
