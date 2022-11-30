import { Team, TeamHistoricResult } from "@src/../../../packages/schema";
import { Text, TeamHistoricResultsCard } from 'ui'

type GameComponentProps = {
    teams: Team[] // Do we need full team info or just memorableIds?
    historicData: Record<string, TeamHistoricResult>
};

export default function GameComponent({ teams, historicData }: GameComponentProps) {
    // TODO: 1v1 teams first
    // Then: multi-teams

    // TODO: Remove this, just for testing
    if(!teams || !teams[0] || !teams[1]) {
        return <div>No Data</div>
    }

    return (
        <section className="my-20 w-full">
            <section className="flex h-full min-h-full w-full items-center justify-around align-middle">
                <TeamHistoricResultsCard team={teams[0]} historicResults={historicData[teams[0].cumulativeTeamId]} />

                <Text type="p">VS</Text>

                <TeamHistoricResultsCard team={teams[1]} historicResults={historicData[teams[1].cumulativeTeamId]} />
            </section>
        </section>
    )
}
