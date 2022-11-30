import { Team, TeamHistoricResult } from "@src/../../../packages/schema";
import { TeamHistoricResultsCard, Button } from 'ui'

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

    const teamOne = teams[0]
    const historicDataForTeamOne = historicData[teamOne.cumulativeTeamId]
    const teamTwo = teams[1]
    const historicDataForTeamTwo = historicData[teamTwo.cumulativeTeamId]

    const abandonGame = () => {
        console.log("Abandon game")
    }

    const setWinner = (team: Team) => {
        console.log(`Winner: ${team.cumulativeTeamId}`)
    }

    return (
        <section className="mb-20 w-full">
            <section className="flex h-full min-h-full w-full items-center space-x-4">
                <TeamHistoricResultsCard
                    team={teamOne}
                    historicResults={historicDataForTeamOne}
                    setAsWinner={() => setWinner(teamOne)}
                    className="w-1/2"
                />

                <TeamHistoricResultsCard
                    team={teamTwo}
                    historicResults={historicDataForTeamTwo}
                    setAsWinner={() => setWinner(teamTwo)}
                    className="w-1/2"
                />
            </section>
            <section className="flex items-centre justify-around align-middle">
                <Button text="Abandon" onClick={abandonGame} className="w-fit"/>
            </section>
        </section>
    )
}