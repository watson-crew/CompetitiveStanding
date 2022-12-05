import dayjs from 'dayjs';
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
import { getFormattedDatePlayed } from '../../utils/timeUtils';
import ResultCardTeam from '../ResultCardTeam/ResultCardTeam';

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
        <ResultCardTeam loading={true} isWinningTeam={false} />
        <Text type="p"> vs </Text>
        <ResultCardTeam loading={true} isWinningTeam={false} />
      </div>
    </div>
  );
}

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

  // Clean this up

  const timeTaken = gameResult.endTime.diff(gameResult.startTime);

  const duration = dayjs
    .duration(timeTaken, 'milliseconds')
    .format('m[m] s[s]');

  const getSportIcon = (iconId: number): IconType => {
    const iconMappings: Record<number, IconType> = {
      1: SportIcons.Pool,
      2: SportIcons.Darts,
      3: SportIcons.TableTennis,
    };

    return iconMappings[iconId] || SportIcons.Pool;
  };

  return renderWithChildren(
    <div>
      <section className="mb-2 flex flex-row justify-between">
        <TextWithIcon
          textProps={{ type: 'p' }}
          icon={getSportIcon(gameResult.gameType.id)}
        >
          {gameResult.gameType.name}
        </TextWithIcon>
        <TextWithIcon textProps={{ type: 'p' }} icon={CommonIcons.Clock}>
          {duration}
        </TextWithIcon>
        <Text type="p">{getFormattedDatePlayed(gameResult.endTime)}</Text>
      </section>

      <section className="flex items-center justify-between gap-2">
        {gameResult.teams.map((team, i) => (
          <>
            <ResultCardTeam
              loading={false}
              team={team}
              isWinningTeam={gameResult.winningTeamId === team.cumulativeTeamId}
            />
            {i !== gameResult.teams.length - 1 && (
              <Text type="p" className="font-bold">
                vs
              </Text>
            )}
          </>
        ))}
      </section>
    </div>,
  );
}
