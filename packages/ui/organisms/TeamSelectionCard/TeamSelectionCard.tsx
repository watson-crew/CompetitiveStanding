import { User } from 'schema';
import { WithDefaultProps } from '../../types';
import { twMerge } from 'tailwind-merge';
import Card from '../../atoms/Card/Card';
import PlayerSelectionCard from '../../molecules/PlayerSelectionCard/PlayerSelectionCard';

type YourMum = {
  user?: User;
  loading: boolean;
};

type TeamSelectionCardProps = WithDefaultProps<{
  title: string;
  team: YourMum[];
  onPlayerAdded: (id: string) => Promise<void>;
  clearPlayer: (playerId?: string) => void;
}>;

export default function TeamSelectionCard({
  team,
  onPlayerAdded,
  clearPlayer,
  className,
  key,
}: TeamSelectionCardProps) {
  const containerClasses = twMerge(
    'bg-slate-100 w-full flex justify-center items-center flex-col md:p-10',
    className,
  );

  // if (loading) {
  //   return (
  //     <Card className={containerClasses}>
  //       <LoadingSpinner />
  //     </Card>
  //   );
  // }

  // console.log('Hi');

  return (
    <Card className={containerClasses}>
      {team.map(player => (
        <PlayerSelectionCard
          key={`${key}-player-selection-card-${player.user?.memorableId}`}
          player={player.user}
          loading={player.loading}
          onIdSubmitted={onPlayerAdded}
          clearPlayer={() => clearPlayer(player.user?.memorableId)}
          className="min-h-full basis-2/5"
        />
      ))}
    </Card>
  );
}
