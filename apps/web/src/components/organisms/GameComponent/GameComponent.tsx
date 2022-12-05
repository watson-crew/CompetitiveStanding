import { Team, TeamHistoricResult } from '@src/../../../packages/schema';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { TeamHistoricResultsCard, Button, TextWithIcon, CommonIcons } from 'ui';

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

  const duration = dayjs
    .duration(timeElapsed, 'milliseconds')
    .format('m[m] ss[s]');

  return (
    <section className="h-full w-full px-10">
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
