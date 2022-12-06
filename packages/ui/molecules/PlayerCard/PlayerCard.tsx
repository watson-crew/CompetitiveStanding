import TextWithIcon from '../TextWithIcon/TextWithIcon';
import { User } from 'schema';
import { CommonIcons } from '../../types/icons';
import Card from '../../atoms/Card/Card';
import { WithDefaultProps } from '../../types';
import { twMerge } from 'tailwind-merge';
import Text from '../../atoms/Text/Text';
import PlayerImage from '../../atoms/PlayerImage/PlayerImage';
import { getFullName } from '../../utils/playerUtils';

type PlayerVariant = 'xs' | 's' | 'm';

type PlayerCardProps = WithDefaultProps<{
  player: User;
  children?: React.ReactNode;
  variant?: PlayerVariant;
  textClassName?: string;
  imageClassName?: string;
}>;

export default function PlayerCard({
  player,
  className,
  children,
  variant = 'm',
  textClassName = '',
  imageClassName = '',
}: PlayerCardProps) {
  const fullName = getFullName(player);

  if (variant == 's' || variant == 'xs') {
    const textStyle = variant === 'xs' ? 'p' : 'h3';
    const imageVariant = variant === 'xs' ? 'xs' : 'm';

    return (
      <Card
        className={twMerge('flex flex-col items-center', className)}
        color="transparent"
      >
        <Text
          type="p"
          style={textStyle}
          className={twMerge('mb-3', textClassName)}
        >
          {player.firstName}
        </Text>
        <PlayerImage
          src={player.profilePicture}
          playerName={fullName}
          variant={imageVariant}
          className={imageClassName}
        />
        {children && <section className="flex">{children}</section>}
      </Card>
    );
  }

  // For 'm' variant - default
  return (
    <Card className={twMerge('flex max-h-32 max-w-sm bg-slate-200', className)}>
      <PlayerImage
        className="flex-none"
        src={player.profilePicture}
        playerName={fullName}
      />

      <section className="pl-10 text-left">
        <Text type="h3" className="text-sky-500 dark:text-sky-400">
          {fullName}
        </Text>
        <Text type="p" className="font-bold text-[#ff3e00]">
          {player.memorableId}
        </Text>
        <TextWithIcon icon={CommonIcons.HomeLocation} textProps={{ type: 'p' }}>
          {player.location}
        </TextWithIcon>
      </section>
      {children && <section className="ml-5 flex">{children}</section>}
    </Card>
  );
}
