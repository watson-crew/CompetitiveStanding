import { twMerge } from 'tailwind-merge';
import Card from '../../atoms/Card/Card';
import PlayerElo, { EloDisplayType } from '../../atoms/PlayerElo/PlayerElo';
import PlayerImage from '../../atoms/PlayerImage/PlayerImage';
import Text from '../../atoms/Text/Text';
import {
  PlayerWithRating,
  PlayerWithRatingChanges,
  WithDefaultProps,
} from '../../types';
import { getFullName } from '../../utils/playerUtils';

type PlayerWithEloProps = WithDefaultProps<{
  player: PlayerWithRating | PlayerWithRatingChanges;
  imageClassName?: string;
  textClassName?: string;
}>;

const isRatingChange = (player: PlayerWithRating | PlayerWithRatingChanges) =>
  !!(player as PlayerWithRatingChanges).eloChange;

export default function PlayerWithElo({
  className,
  imageClassName,
  player,
  textClassName,
}: PlayerWithEloProps) {
  let elo: number;
  let displayType: EloDisplayType;

  if (isRatingChange(player)) {
    const updatedRatingPlayer: PlayerWithRatingChanges = player;
    elo = updatedRatingPlayer.eloChange || 0;
    displayType = elo >= 0 ? 'gain' : 'loss';
  } else {
    const updatedRatingPlayer: PlayerWithRating = player;
    elo = updatedRatingPlayer.elo || 0;
    displayType = 'total';
  }

  const fullName = getFullName(player);

  return (
    <section>
      <Card
        className={twMerge('flex items-center gap-5', className)}
        color="transparent"
      >
        <PlayerImage
          src={player.profilePicture}
          playerName={fullName}
          variant="s"
          className={imageClassName}
        />
        <section className="items-left flex h-full flex-col justify-between">
          <Text type="p" className={twMerge(textClassName)}>
            {player.firstName}
          </Text>

          <PlayerElo elo={elo} displayType={displayType} />
        </section>
      </Card>
    </section>
  );
}
