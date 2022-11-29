import { User } from 'schema';
import { WithDefaultProps } from '../../types';
import { twMerge } from 'tailwind-merge';
import Card from '../../atoms/Card/Card';
import PlayerSelectionCard from '../../molecules/PlayerSelectionCard/PlayerSelectionCard';
import { AiOutlineUserAdd } from 'react-icons/ai';
import Button from '../../atoms/Button/Button';
import TextWithIcon from '../../molecules/TextWithIcon/TextWithIcon';

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
  maxPlayersPerTeam: number;
}>;

export default function TeamSelectionCard({
  team,
  onPlayerAdded,
  increaseTeamSize,
  clearPlayer,
  className,
  maxPlayersPerTeam,
  key,
}: TeamSelectionCardProps) {
  const containerClasses = twMerge(
    'bg-slate-200 w-full flex justify-center items-center flex-col md:p-10  gap-5',
    className,
  );

  const allSlotsFilled = team.every(player => !!player.user);

  const allSpacesFilled = maxPlayersPerTeam === team.length;

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

      {!allSpacesFilled && (
        <Button onClick={increaseTeamSize} disabled={!allSlotsFilled}>
          <TextWithIcon
            textProps={{ type: 'p' }}
            icon={AiOutlineUserAdd}
            iconSize="l"
          >
            Add Player
          </TextWithIcon>
        </Button>
      )}
    </Card>
  );
}
