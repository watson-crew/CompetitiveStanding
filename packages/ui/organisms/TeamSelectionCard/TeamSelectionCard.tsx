import { User } from 'schema';
import { WithDefaultProps } from '../../types';
import { twMerge } from 'tailwind-merge';
import Card from '../../atoms/Card/Card';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import PlayerSelectionCard from '../../molecules/PlayerSelectionCard/PlayerSelectionCard';

type TeamSelectionCardProps = WithDefaultProps<{
  title: string;
  team: (User | undefined)[];
  loading: boolean;
  onPlayerAdded: (id: string) => Promise<void>;
  clearPlayer: (playerId?: string) => void;
}>;

export default function TeamSelectionCard({
  team,
  loading,
  onPlayerAdded,
  clearPlayer,
  className,
  key,
}: TeamSelectionCardProps) {
  const containerClasses = twMerge(
    'bg-slate-100 w-full flex justify-center items-center flex-col md:p-10',
    className,
  );

  if (loading) {
    return (
      <Card className={containerClasses}>
        <LoadingSpinner />
      </Card>
    );
  }

  console.log('Hi');

  return (
    <Card>
      {team.map(player => (
        <PlayerSelectionCard
          key={`${key}-player-selection-card-${player?.memorableId}`}
          player={player}
          loading={false}
          onIdSubmitted={onPlayerAdded}
          clearPlayer={() => clearPlayer(player?.memorableId)}
          className="min-h-full basis-2/5"
        />
      ))}
    </Card>
  );
}
