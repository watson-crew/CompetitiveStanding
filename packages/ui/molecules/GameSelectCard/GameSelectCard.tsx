import { WithDefaultProps } from '../../types';
import { GameType } from 'schema';
import TextWithIcon from '../TextWithIcon/TextWithIcon';
import { getSportIcon } from '../../utils/iconUtils';
import { UrlObject } from 'url';
import Link from 'next/link';

type GameSelectCardProps = WithDefaultProps<{
  game: GameType;
  link: string | UrlObject;
}>;

export default function GameSelectCard({ game, link }: GameSelectCardProps) {
  return (
    <Link
      href={link}
      className="flex h-full w-full flex-col justify-center rounded-xl bg-slate-200 px-8 pt-5 hover:bg-slate-400"
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
