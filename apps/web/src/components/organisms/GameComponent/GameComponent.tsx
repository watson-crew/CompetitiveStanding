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
        <section className="w-full h-full">
            <section className="flex h-full w-full items-center space-x-4 px-10">
                <TeamHistoricResultsCard
                    team={teamOne}
                    historicResults={historicDataForTeamOne}
                    setAsWinner={() => setWinner(teamOne)}
                    className="w-1/2 h-4/5"
                />

                <TeamHistoricResultsCard
                    team={teamTwo}
                    historicResults={historicDataForTeamTwo}
                    setAsWinner={() => setWinner(teamTwo)}
                    className="w-1/2 h-4/5"
                />
            </section>
            <section className="absolute top-5 left-10">
                <Button
                    text="Abandon"
                    onClick={abandonGame}
                    className="text-2xl font-bold w-fit"
                />
            </section>
        </section>
    )
}
