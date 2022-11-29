import { User } from 'schema';
import { WithDefaultProps } from '../../types';
import { twMerge } from 'tailwind-merge';
import Card from '../../atoms/Card/Card';
import PlayerSelectionCard from '../../molecules/PlayerSelectionCard/PlayerSelectionCard';
import IconButton from '../../atoms/IconButton/IconButton';
import { AiOutlineUserAdd } from 'react-icons/ai';
import WithCloseButton from '../../atoms/WithCloseButton/WithCloseButton';

type YourMum = {
  user?: User;
  loading: boolean;
};

type TeamSelectionCardProps = WithDefaultProps<{
  title: string;
  team: YourMum[];
  onPlayerAdded: (id: string) => Promise<void>;
  increaseTeamSize: () => Promise<void>;
  clearPlayer: (playerId?: string) => void;
}>;

export default function TeamSelectionCard({
  team,
  onPlayerAdded,
  increaseTeamSize,
  clearPlayer,
  className,
  key,
}: TeamSelectionCardProps) {
  const containerClasses = twMerge(
    'bg-slate-200 w-full flex justify-center items-center flex-col md:p-10  gap-5',
    className,
  );

  const allSlotsFilled = team.every(player => !!player.user);

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

      {
        <IconButton
          icon={AiOutlineUserAdd}
          buttonSize="l"
          onClick={increaseTeamSize}
          className={'mt-5'}
          disabled={!allSlotsFilled}
          iconClassName={
            'fill-slate-500 transition duration-300 hover:fill-slate-800'
          }
        />
      }
    </Card>
  );
}
