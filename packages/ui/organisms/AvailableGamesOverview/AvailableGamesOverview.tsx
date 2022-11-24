import { GameType } from 'schema';
import { twMerge } from 'tailwind-merge';
import Card from '../../atoms/Card/Card';
import Text from '../../atoms/Text/Text';
import GameSelectCard from '../../molecules/GameSelectCard/GameSelectCard';
import { WithDefaultProps } from '../../types';

type AvailableGamesOverviewProps = WithDefaultProps<{
  availableGames: GameType[];
}>;

export default function AvailableGamesOverview({ className }: AvailableGamesOverviewProps) {
  const count = 3;

  const cardsToRender = [];

  for (let i = 0; i < count; i++) {
    cardsToRender.push(<GameSelectCard key={i} className="gap-x-4" />);
  }

  return (
    <Card color="slate-200" className={twMerge("h-full w-full flex flex-col max-2-lg", className)}>
      <Text type="h2" className='block'>Start a game...</Text>
      <div className="h-full w-full flex-row flex overflow-scroll">{cardsToRender}</div>
    </Card>
  )
}
