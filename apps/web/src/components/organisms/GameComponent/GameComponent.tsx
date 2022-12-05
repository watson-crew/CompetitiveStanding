import { useEffect, useState } from 'react';
import Modal from 'react-modal'
import dayjs, { Dayjs } from 'dayjs';
import { TeamHistoricResultsCard, Button, TextWithIcon } from 'ui';
import { Team, TeamHistoricResult, User } from 'schema';
import { IoMdTime } from 'react-icons/io';

enum GameEndType {
  NewGame = 'NewGame',
  Finish = 'Finish'
}

type GameComponentProps = {
  teams: Team[];
  historicData: Record<string, TeamHistoricResult>;
  matchId: number;
  abandonMatch: () => void;
  finishMatch: () => void;
  playAgain: (teams: User[][]) => Promise<void>;
  setMatchWinner: (cumulativeTeamId: string) => void;
};

export default function GameComponent({
  teams,
  historicData,
  abandonMatch,
  finishMatch,
  setMatchWinner,
  playAgain
}: GameComponentProps) {
  // TODO: Refactor to work with more than 2 teams

  const [gameStartTime, setGameStartTime] = useState<Dayjs>(dayjs());
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(
      () => setTimeElapsed(dayjs().diff(gameStartTime)),
      1000,
    );

    if (isGameFinished) clearInterval(interval)

    return () => {
      clearInterval(interval);
    };
  }, [gameStartTime, isGameFinished]);

  const abandonGame = () => {
    abandonMatch();
  };

  const setWinner = (team: Omit<Team, 'id'>) => {
    setMatchWinner(team.cumulativeTeamId);
    setIsGameFinished(true);
  };

  const handleGameEnd = async (endState: GameEndType) => {
    if (endState === GameEndType.Finish) {
      finishMatch()
    } else if (endState === GameEndType.NewGame) {  
      const participatingTeams = teams.map(
        (team: Team) => team.players as User[],
      );
      try {
        await playAgain(participatingTeams)
        setGameStartTime(dayjs())
        setTimeElapsed(0)
      } catch (e) {
  
      }
    }
    setIsGameFinished(false)
  }

  const teamOne = teams[0];
  const historicDataForTeamOne = historicData[teamOne.cumulativeTeamId];
  const teamTwo = teams[1];
  const historicDataForTeamTwo = historicData[teamTwo.cumulativeTeamId];

  const duration = dayjs
    .duration(timeElapsed, 'milliseconds')
    .format('m[m] ss[s]');

  // TODO: Display current game length
  //       For this we need to know the startTime of the match. We can get the matchId, or the full matchDetails as a prop
  return (
    <section className="h-full w-full px-10">
      <Modal 
        isOpen={isGameFinished}
        style={{ content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        }}}>
          <Button className='mr-2' text="Play again" onClick={() => handleGameEnd(GameEndType.NewGame)} />
          <Button text="Finish" onClick={() => handleGameEnd(GameEndType.Finish)} />
      </Modal>
      <div id="control-bar" className="flex justify-end">
        <TextWithIcon
          textProps={{ type: 'p' }}
          icon={IoMdTime}
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
    </section>
  );
}
