import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  TeamHistoricResultsCard,
  Button,
  TextWithIcon,
  CommonIcons,
  TeamWithRatings,
} from 'ui';
import { RankingChanges, Team, TeamHistoricResult, User } from 'schema';
import GameWonModal from '../GameWonModal/GameWonModal';
import Confetti from 'react-confetti';

enum GameEndType {
  NewGame = 'NewGame',
  Finish = 'Finish',
}

type GameComponentProps = {
  teams: TeamWithRatings[];
  historicData: Record<string, TeamHistoricResult>;
  matchId: number;
  abandonMatch: () => void;
  finishMatch: () => void;
  playAgain: (teams: User[][]) => Promise<void>;
  setMatchWinner: (cumulativeTeamId: string) => Promise<RankingChanges>;
};

export default function GameComponent({
  teams,
  historicData,
  abandonMatch,
  finishMatch,
  setMatchWinner,
  playAgain,
}: GameComponentProps) {
  // TODO: Refactor to work with more than 2 teams

  const [gameStartTime, setGameStartTime] = useState<Dayjs>(dayjs());
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [gameResults, setGameResults] = useState<RankingChanges>();
  const [winningTeam, setWinningTeam] = useState<TeamWithRatings>();

  useEffect(() => {
    const interval = setInterval(
      () => setTimeElapsed(dayjs().diff(gameStartTime)),
      1000,
    );

    if (winningTeam) clearInterval(interval);

    return () => {
      clearInterval(interval);
    };
  }, [gameStartTime, winningTeam]);

  const abandonGame = () => {
    abandonMatch();
  };

  const setWinner = async (team: TeamWithRatings) => {
    const changes = await setMatchWinner(team.cumulativeTeamId);
    setGameResults(changes);
    setWinningTeam(team);
  };

  const handleGameEnd = async (endState: GameEndType) => {
    if (endState === GameEndType.Finish) {
      finishMatch();
    } else if (endState === GameEndType.NewGame) {
      const participatingTeams = teams.map(
        (team: Team) => team.players as User[],
      );
      try {
        await playAgain(participatingTeams);
        setGameStartTime(dayjs());
        setTimeElapsed(0);
      } catch (e) {}
    }
    // setIsGameFinished(false);
    setWinningTeam(undefined);
  };

  const duration = dayjs
    .duration(timeElapsed, 'milliseconds')
    .format('m[m] ss[s]');

  return (
    <section className="h-full w-full px-10">
      {!!winningTeam && <Confetti />}

      <GameWonModal
        allTeams={teams}
        winningTeam={winningTeam}
        finish={() => handleGameEnd(GameEndType.Finish)}
        playAgain={() => handleGameEnd(GameEndType.NewGame)}
        ratingChanges={gameResults}
      />

      <div id="control-bar" className="flex justify-end">
        <TextWithIcon
          textProps={{ type: 'p' }}
          icon={CommonIcons.Clock}
          className="pr-10"
        >
          {duration}
        </TextWithIcon>
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
    </section>
  );
}
