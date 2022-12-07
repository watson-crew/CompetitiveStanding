import { CommonIcons, WithDefaultProps } from '../../types';
import { IoLogoGameControllerB } from 'react-icons/io';
import TextWithIcon from '../TextWithIcon/TextWithIcon';
import { RankedPlayer } from 'schema';
import { twMerge } from 'tailwind-merge';
import { IconType } from 'react-icons';

type TopPlayerStatsProps = WithDefaultProps<
  RankedPlayer & {
    fullVersion: boolean;
  }
>;

export default function TopPlayerStats({
  player,
  className,
  gamesPlayed,
  wins,
  elo,
  winPercentage,
  fullVersion = false,
}: TopPlayerStatsProps) {
  const infoToShow: {
    label: string;
    content: string | number;
    icon: IconType;
    className: string;
  }[] = [
    {
      label: 'Wins',
      content: wins,
      icon: CommonIcons.Trophy,
      className: 'text-green-800',
    },
    {
      label: 'Games Played',
      content: gamesPlayed,
      icon: IoLogoGameControllerB,
      className: 'text-blue-700',
    },
    {
      label: 'Elo',
      content: elo,
      icon: CommonIcons.Elo,
      className: 'text-orange-600',
    },
    {
      label: 'Win rate',
      content: winPercentage,
      icon: CommonIcons.Percentage,
      className: 'text-white',
    },
  ];

  return (
    <div
      className={twMerge(
        'flex w-fit flex-row flex-wrap justify-between gap-2',
        className,
      )}
    >
      {infoToShow.map(({ icon, label, content, className }, i) => (
        <TextWithIcon
          className={className}
          key={`${player.memorableId}-stats-${i}`}
          textProps={{
            type: 'p',
            className: 'font-extrabold',
          }}
          icon={icon}
        >
          {fullVersion ? `${label}: ` : ''}
          {content}
        </TextWithIcon>
      ))}
    </div>
  );
}
