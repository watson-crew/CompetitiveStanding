import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import dayjs, { Dayjs } from 'dayjs';
import {
  TeamHistoricResultsCard,
  Button,
  TeamWithRatings,
  Card,
  Timer,
} from 'ui';
import {
  GameType,
  Location,
  RankingChanges,
  Team,
  TeamHistoricResult,
  User,
} from 'schema';
import GameWonModal from '../GameWonModal/GameWonModal';
import { useRouter } from 'next/router';

enum GameEndType {
  REMATCH,
  NEW_TEAMS,
  FINISH,
}

type GameComponentProps = {
  teams: TeamWithRatings[];
  historicData: Record<string, TeamHistoricResult>;
  matchId: number;
  abandonMatch: () => void;
  finishMatch: () => void;
  playAgain: (teams: User[][]) => Promise<void>;
  setMatchWinner: (cumulativeTeamId: string) => Promise<RankingChanges>;
  gameLocation: Location;
  gameType: GameType;
};

export default function GameComponent({
  teams,
  historicData,
  abandonMatch,
  finishMatch,
  setMatchWinner,
  playAgain,
  gameLocation,
  gameType,
}: GameComponentProps) {
  // TODO: Refactor to work with more than 2 teams
  const router = useRouter();
  const [gameStartTime, setGameStartTime] = useState<Dayjs>(dayjs());
  const [gameResults, setGameResults] = useState<RankingChanges>();
  const [winningTeam, setWinningTeam] = useState<TeamWithRatings>();
  const [breaking, setBreaking] = useState<string | undefined>('');

  const abandonGame = () => {
    abandonMatch();
  };

  useEffect(() => {
    const breakingPlayer = () => {
      const sortedTeams = [...teams].sort(sortByProperty('cumulativeTeamId'));
      const gamesPlayed = sortedTeams.reduce(
        (acc, val) => acc + (historicData[val.cumulativeTeamId].wins || 0),
        0,
      );
      const teamIndex = whoStarts(sortedTeams, gamesPlayed);
      const players = [...sortedTeams[teamIndex].players].sort(
        sortByProperty('memorableId'),
      );

      return players[whoStarts(players, Math.floor(gamesPlayed / teams.length))]
        .firstName;
    };

    setBreaking(breakingPlayer());
  }, [teams, historicData]);

  function whoStarts<T>(array: T[], gamesPlayed: number): number {
    return (gamesPlayed + array.length) % array.length;
  }

  function sortByProperty(property: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (a: any, b: any) =>
      a[property] > b[property] ? 1 : a[property] < b[property] ? -1 : 0;
  }

  const setWinner = async (team: TeamWithRatings) => {
    const changes = await setMatchWinner(team.cumulativeTeamId);
    setGameResults(changes);
    setWinningTeam(team);
  };

  const handleGameEnd = async (endState: GameEndType) => {
    switch (endState) {
      case GameEndType.NEW_TEAMS:
        finishMatch();
        setWinningTeam(undefined);
        break;
      case GameEndType.REMATCH:
        const participatingTeams = teams.map(
          (team: Team) => team.players as User[],
        );
        try {
          await playAgain(participatingTeams);
          setGameStartTime(dayjs());
          setWinningTeam(undefined);
        } catch (e) {}
        break;
      case GameEndType.FINISH:
        router.push(`/location/${gameLocation.urlPath}`);
        break;
    }
  };

  return (
    <section className="h-full w-full px-10">
      {!!winningTeam && <Confetti />}
      <GameWonModal
        allTeams={teams}
        winningTeam={winningTeam}
        teamSelection={() => handleGameEnd(GameEndType.NEW_TEAMS)}
        rematch={() => handleGameEnd(GameEndType.REMATCH)}
        finish={() => handleGameEnd(GameEndType.FINISH)}
        ratingChanges={gameResults}
        gameStartTime={gameStartTime}
        gameType={gameType}
        gameLocation={gameLocation}
      />

      <div id="control-bar" className="flex justify-end">
        <Timer className="pr-10" startTime={gameStartTime} isCounting={true} />
        <Button
          text="Abandon"
          onClick={abandonGame}
          className="w-fit text-2xl font-bold"
        />
      </div>
      <section className="h-min-content flex w-full items-center space-x-4">
        {teams.map((team, i) => (
          <TeamHistoricResultsCard
            key={i}
            team={team}
            historicResults={historicData[team.cumulativeTeamId]}
            className="h-4/5 w-1/2"
            setAsWinner={() => setWinner(team)}
          />
        ))}
      </section>
      <Card className="h-min-content text-m mt-2 w-full text-center font-bold">
        Breaking: {breaking}
      </Card>
    </section>
  );
}
