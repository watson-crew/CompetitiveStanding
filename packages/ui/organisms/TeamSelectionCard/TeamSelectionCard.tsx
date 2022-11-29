import { LoadingPlayer, WithDefaultProps } from '../../types';
import { twMerge } from 'tailwind-merge';
import Card from '../../atoms/Card/Card';
import PlayerSelectionCard from '../../molecules/PlayerSelectionCard/PlayerSelectionCard';
import { AiOutlineUserAdd } from 'react-icons/ai';
import Button from '../../atoms/Button/Button';
import TextWithIcon from '../../molecules/TextWithIcon/TextWithIcon';

type TeamSelectionCardProps = WithDefaultProps<{
  team: LoadingPlayer[];
  onPlayerAdded: (id: string) => Promise<void>;
  increaseTeamSize: () => Promise<void>;
  clearPlayer: (playerId?: string) => void;
  maxPlayersPerTeam: number;
  teamNumber: number;
}>;

export default function TeamSelectionCard({
  team,
  onPlayerAdded,
  increaseTeamSize,
  clearPlayer,
  className,
  maxPlayersPerTeam,
  teamNumber,
}: TeamSelectionCardProps) {
  const containerClasses = twMerge(
    'bg-slate-200 w-full flex justify-center items-center flex-col md:p-10  gap-5',
    className,
  );

  const allSlotsFilled = team.every(player => !!player.playerDetails);

  const allSpacesFilled = maxPlayersPerTeam === team.length;

  return (
    <Card className={containerClasses}>
      {team.map(({ playerDetails, loading }) => (
        <PlayerSelectionCard
          key={`team-${teamNumber}-player-${playerDetails?.memorableId}`}
          player={playerDetails}
          loading={loading}
          onIdSubmitted={onPlayerAdded}
          clearPlayer={() => clearPlayer(playerDetails?.memorableId)}
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
