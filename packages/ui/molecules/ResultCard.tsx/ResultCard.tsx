import React from 'react';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';
import { Text, TextWithIcon } from '../..';
import Card from '../../atoms/Card/Card';
import {
  CommonIcons,
  GameResult,
  SportIcons,
  WithDefaultProps,
  WithLoadingProps,
} from '../../types';
import { insertBetween } from '../../utils/reactComponentUtils';
import { formatDuration, getFormattedDatePlayed } from '../../utils/timeUtils';
import TeamCard from '../TeamCard/TeamCard';

type ResultCardProps = WithDefaultProps<
  WithLoadingProps<{
    gameResult?: GameResult;
  }>
>;

function ResultCardLoadingStateContent() {
  return (
    <div className="flex w-full animate-pulse flex-col space-x-4">
      <div className="mb-5 grid w-full grid-cols-10 gap-4 ">
        <div className="col-span-2 h-2 rounded bg-slate-700"></div>
        <div className="col-span-2" />
        <div className="col-span-2 h-2 rounded bg-slate-700"></div>
        <div className="col-span-2" />
        <div className="col-span-2 h-2 rounded bg-slate-700"></div>
      </div>
      <div className="flex items-center justify-around gap-2">
        <TeamCard loading={true} isWinningTeam={false} />
        <Text type="p"> vs </Text>
        <TeamCard loading={true} isWinningTeam={false} />
      </div>
    </div>
  );
}

// Move this somewhere
const getSportIcon = (iconId: number): IconType => {
  const iconMappings: Record<number, IconType> = {
    1: SportIcons.Pool,
    2: SportIcons.Darts,
    3: SportIcons.TableTennis,
  };

  return iconMappings[iconId] || SportIcons.Pool;
};

export default function ResultCard({
  className,
  gameResult,
  loading,
}: ResultCardProps) {
  const renderWithChildren = (
    children: React.ReactNode,
    classNameOverride: string = className || '',
  ) =>
    React.createElement(
      Card,
      { className: twMerge('w-full', classNameOverride) },
      children,
    );

  if (loading || !gameResult) {
    return renderWithChildren(ResultCardLoadingStateContent());
  }

  const is1v1 = ({ teams }: GameResult): boolean =>
    teams.length === 2 && teams.every(team => team.players.length === 1);

  return renderWithChildren(
    <div className="flex flex-row-reverse">
      <section className="flex w-fit w-32 min-w-max flex-col justify-between whitespace-nowrap border-l-2 pl-2 ">
        <TextWithIcon
          textProps={{ type: 'p' }}
          icon={getSportIcon(gameResult.gameType.id)}
        >
          {gameResult.gameType.name}
        </TextWithIcon>
        <TextWithIcon textProps={{ type: 'p' }} icon={CommonIcons.Clock}>
          {formatDuration(
            gameResult.startTime,
            gameResult.endTime,
            'm[m] s[s]',
          )}
        </TextWithIcon>
        <Text type="p">{getFormattedDatePlayed(gameResult.endTime)}</Text>
      </section>

      <section className="flex w-full items-center justify-between gap-2 pr-8 md:pr-4">
        {insertBetween(
          gameResult.teams.map((team, i) => (
            <TeamCard
              key={`team-${team.cumulativeTeamId}`}
              loading={false}
              team={team}
              isWinningTeam={gameResult.winningTeamId === team.cumulativeTeamId}
              displayElos={is1v1(gameResult)}
              flipCard={i == 0}
            />
          )),
          key => (
            <Text type="p" className="font-bold" key={key}>
              vs
            </Text>
          ),
          i => `vs-${i}`,
        )}
      </section>
    </div>,
  );
}
