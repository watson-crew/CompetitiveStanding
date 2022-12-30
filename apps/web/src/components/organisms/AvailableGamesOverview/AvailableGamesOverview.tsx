import { Card, GameSelectCard, Text, WithDefaultProps } from 'ui';
import { GameType } from 'schema';
import { twMerge } from 'tailwind-merge';
import { UrlObject } from 'url';

type AvailableGamesOverviewProps = WithDefaultProps<{
  availableGames: GameType[];
  buildGameLink: (gameType: GameType) => string | UrlObject;
}>;

export default function AvailableGamesOverview({
  className,
  availableGames,
  buildGameLink,
}: AvailableGamesOverviewProps) {
  return (
    <Card
      color="slate-200"
      className={twMerge('max-2-lg flex h-full w-full flex-col', className)}
    >
      <Text type="h2" className="mb-5 block">
        Start a game...
      </Text>
      <div className="flex h-full w-full flex-row gap-5">
        {availableGames.map(game => (
          <GameSelectCard
            key={game.id}
            link={buildGameLink(game)}
            game={game}
            className="gap-x-4"
          />
        ))}
      </div>
    </Card>
  );
}
