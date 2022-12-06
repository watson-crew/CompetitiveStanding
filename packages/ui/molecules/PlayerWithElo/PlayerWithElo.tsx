import { twMerge } from 'tailwind-merge';
import Card from '../../atoms/Card/Card';
import PlayerElo from '../../atoms/PlayerElo/PlayerElo';
import PlayerImage from '../../atoms/PlayerImage/PlayerImage';
import Text, { TextType } from '../../atoms/Text/Text';
import { PlayerWithRating, WithDefaultProps } from '../../types';
import { getFullName } from '../../utils/playerUtils';

type Variant = 's' | 'm' | 'l';

type PlayerWithEloProps = WithDefaultProps<{
  variant?: Variant;
  player: PlayerWithRating;
  imageClassName?: string;
  textClassName?: string;
}>;

const textStyleForVariant: Record<Variant, TextType> = {
  s: 'p',
  m: 'h4',
  l: 'h2',
};

export default function PlayerWithElo({
  className,
  imageClassName,
  player,
  textClassName,
  variant = 's',
}: PlayerWithEloProps) {
  const startElo = player.elo;
  const eloChange = player.eloChange;

  const fullName = getFullName(player);
  const textStyle = textStyleForVariant[variant];

  const nameToDisplay = variant === 's' ? player.firstName : fullName;

  return (
    <section>
      <Card
        className={twMerge('flex h-full items-center gap-5', className)}
        color="transparent"
      >
        <PlayerImage
          src={player.profilePicture}
          playerName={fullName}
          variant={variant}
          className={imageClassName}
        />
        <section className="items-left flex h-full flex-col justify-around">
          <Text type="p" className={twMerge(textClassName)} style={textStyle}>
            {nameToDisplay}
          </Text>
          <span className="flex gap-2">
            {variant != 's' && (
              <PlayerElo
                displayType="total"
                startElo={startElo}
                eloChange={eloChange}
                textStyle={textStyle}
              />
            )}
            {eloChange && (
              <PlayerElo
                startElo={0}
                eloChange={eloChange}
                textStyle={textStyle}
              />
            )}
          </span>
        </section>
      </Card>
    </section>
  );
}
