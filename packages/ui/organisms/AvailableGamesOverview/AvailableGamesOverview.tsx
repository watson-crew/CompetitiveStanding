import { GameType } from 'schema';
import { twMerge } from 'tailwind-merge';
import Card from '../../atoms/Card/Card';
import Text from '../../atoms/Text/Text';
import GameSelectCard from '../../molecules/GameSelectCard/GameSelectCard';
import { WithDefaultProps } from '../../types';

type AvailableGamesOverviewProps = WithDefaultProps<{
  availableGames: GameType[];
}>;

export default function AvailableGamesOverview({
  className,
  availableGames
}: AvailableGamesOverviewProps) {
  return (
    <Card
      color="slate-200"
      className={twMerge('max-2-lg flex h-full w-full flex-col', className)}
    >
      <Text type="h2" className="block mb-5">
        Start a game...
      </Text>
      <div className="flex h-full w-full flex-row overflow-scroll gap-5">
        { availableGames.map(game =>  
          <GameSelectCard key={game.id} link={`/play?game=${game.id}`} game={game} className="gap-x-4" />
        )}
      </div>
    </Card>
  );
}
