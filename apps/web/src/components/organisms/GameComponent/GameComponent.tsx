import { Team, TeamHistoricResult } from '@src/../../../packages/schema';
import { TeamHistoricResultsCard, Button } from 'ui';

type GameComponentProps = {
  teams: Omit<Team, 'id'>[];
  historicData: Record<string, TeamHistoricResult>;
  matchId: number;
  abandonMatch: () => void;
  setMatchWinner: (cumulativeTeamId: string) => void;
};

export default function GameComponent({
  teams,
  historicData,
  abandonMatch,
  setMatchWinner,
}: GameComponentProps) {
  // TODO: Refactor to work with more than 2 teams

  const abandonGame = () => {
    console.log('Abandon game');
    abandonMatch();
  };

  const setWinner = (team: Omit<Team, 'id'>) => {
    console.log(`Winner: ${team.cumulativeTeamId}`);
    setMatchWinner(team.cumulativeTeamId);
  };

  const teamOne = teams[0];
  const historicDataForTeamOne = historicData[teamOne.cumulativeTeamId];
  const teamTwo = teams[1];
  const historicDataForTeamTwo = historicData[teamTwo.cumulativeTeamId];

  // TODO: Display current game length
  //       For this we need to know the startTime of the match. We can get the matchId, or the full matchDetails as a prop
  return (
    <section className="h-full w-full">
      <section className="flex h-full w-full items-center space-x-4 px-10">
        <TeamHistoricResultsCard
          team={teamOne}
          historicResults={historicDataForTeamOne}
          setAsWinner={() => setWinner(teamOne)}
          className="h-4/5 w-1/2"
        />

        <TeamHistoricResultsCard
          team={teamTwo}
          historicResults={historicDataForTeamTwo}
          setAsWinner={() => setWinner(teamTwo)}
          className="h-4/5 w-1/2"
        />
      </section>
      <section className="absolute top-5 left-10">
        <Button
          text="Abandon"
          onClick={abandonGame}
          className="w-fit text-2xl font-bold"
        />
      </section>
    </section>
  );
}
