import { WithDefaultProps } from '../../types';
import { GameType } from 'schema';
import Link from '../../atoms/Link/Link';
import TextWithIcon from '../TextWithIcon/TextWithIcon';
import { getSportIcon } from '../../utils/iconUtils';
import { UrlObject } from 'url';

type GameSelectCardProps = WithDefaultProps<{
  game: GameType;
  link: string | UrlObject;
}>;

export default function GameSelectCard({ game, link }: GameSelectCardProps) {
  return (
    <Link
      href={link}
      className="flex h-full w-full flex-col justify-center pt-5"
    >
      <TextWithIcon
        key={game.id}
        icon={getSportIcon(game.id)}
        textProps={{ type: 'p' }}
      >
        {game.name}
      </TextWithIcon>
    </Link>
  );
}
