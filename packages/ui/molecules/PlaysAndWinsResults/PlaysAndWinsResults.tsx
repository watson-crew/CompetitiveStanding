import { CommonIcons, WithDefaultProps } from '../../types';
import { IoLogoGameControllerB } from 'react-icons/io';
import TextWithIcon from '../TextWithIcon/TextWithIcon';
import { RankedPlayer } from 'schema';
import { twMerge } from 'tailwind-merge';

type PlaysAndWinsResultsProps = WithDefaultProps<
  Omit<RankedPlayer, 'player'> & {
    fullVersion: boolean;
  }
>;

export default function PlaysAndWinsResults({
  className,
  gamesPlayed,
  wins,
  elo,
  winPercentage,
  fullVersion = false,
}: PlaysAndWinsResultsProps) {
  return (
    <div className={twMerge('flex flex-col gap-5', className)}>
      <TextWithIcon
        className="text-sky-500 before:mr-2"
        textProps={{ type: 'p' }}
        icon={CommonIcons.Trophy}
      >
        {fullVersion ? 'Wins: ' : ''}
        {wins}
      </TextWithIcon>

      <TextWithIcon
        className="text-[#ff3e00] before:mr-2"
        textProps={{ type: 'p' }}
        icon={IoLogoGameControllerB}
      >
        {fullVersion ? 'Games Played: ' : ''}
        {gamesPlayed}
      </TextWithIcon>

      <TextWithIcon
        className="text-[#ff3e00] before:mr-2"
        textProps={{ type: 'p' }}
        icon={CommonIcons.Elo}
      >
        {fullVersion ? 'Elo: ' : ''}
        {elo}
      </TextWithIcon>

      <TextWithIcon
        className="text-[#ff3e00] before:mr-2"
        textProps={{ type: 'p' }}
        icon={CommonIcons.Percentage}
      >
        {fullVersion ? 'Win Rate: ' : ''}
        {winPercentage}
      </TextWithIcon>
    </div>
  );
}
