
import { Team, TeamHistoricResult } from 'schema';
import { WithDefaultProps } from '../../types';

type TeamHistoricResultsProps = WithDefaultProps<{
    team: Team,
    historicResults: TeamHistoricResult
}>

export default function TeamHistoricResultsCard({team, historicResults}: TeamHistoricResultsProps) {

    return (
        <div>
            Team: {team.cumulativeTeamId},
            Wins: {historicResults.wins}
        </div>
    )
}