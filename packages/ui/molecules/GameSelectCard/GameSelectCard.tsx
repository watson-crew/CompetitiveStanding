import { WithDefaultProps } from '../../types';
import { GameType } from 'schema';
import Link from '../../atoms/Link/Link';
import TextWithIcon from '../TextWithIcon/TextWithIcon';
import { getSportIcon } from '../../utils/iconUtils';

type GameSelectCardProps = WithDefaultProps<{
  game: GameType,
  link: string
}>;

export default function GameSelectCard({ game, link }: GameSelectCardProps) {
  return (
    <Link href={link} className='flex flex-col justify-center pt-5 w-full h-full'>
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
