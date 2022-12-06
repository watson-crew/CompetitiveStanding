import { TeamHistoricResult } from 'schema';
import { twMerge } from 'tailwind-merge';
import { TeamWithRatings, WithDefaultProps } from '../../types';
import Card from '../../atoms/Card/Card';
import Text from '../../atoms/Text/Text';
import TextWithIcon from '../TextWithIcon/TextWithIcon';
import { Button, PlayerWithElo } from '../..';
import { CommonIcons } from '../../types/icons';
import WithScrollbar from '../../atoms/WithScrollbar/WithScrollbar';

type TeamHistoricResultsProps = WithDefaultProps<{
  team: Omit<TeamWithRatings, 'id'>;
  historicResults: TeamHistoricResult;
  setAsWinner: () => void;
}>;

export default function TeamHistoricResultsCard({
  team,
  historicResults,
  setAsWinner,
  className,
}: TeamHistoricResultsProps) {
  const containerClasses = twMerge(
    'bg-slate-100 flex flex-col items-center justify-center',
    className,
  );

  return (
    <Card className={containerClasses}>
      <div className="flex-end mb-10 flex flex-none">
        <Text type="h2" className="text-3xl">
          {team.cumulativeTeamId}
        </Text>
        <TextWithIcon
          icon={CommonIcons.Trophy}
          iconSize="xl"
          textProps={{ type: 'h3', className: 'text-3xl' }}
        >
          {historicResults.wins}
        </TextWithIcon>
      </div>

      <WithScrollbar className="flex-grow items-center justify-center">
        {team.players.map(player => (
          <PlayerWithElo player={player} variant="m" />
          // <PlayerCard player={player} variant="s" />
        ))}
      </WithScrollbar>

      <Button
        onClick={setAsWinner}
        text="Mark as Winner"
        className="w-fit flex-none"
      />
    </Card>
  );
}
