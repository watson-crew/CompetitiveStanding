import { Team, TeamHistoricResult } from '@src/../../../packages/schema';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { TeamHistoricResultsCard, Button, Text, TextWithIcon } from 'ui';
import { IoMdTime } from 'react-icons/io';

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

  const [gameStartTime] = useState<Dayjs>(dayjs());
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(
      () => setTimeElapsed(dayjs().diff(gameStartTime)),
      1000,
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  const abandonGame = () => {
    abandonMatch();
  };

  const setWinner = (team: Omit<Team, 'id'>) => {
    setMatchWinner(team.cumulativeTeamId);
  };

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
