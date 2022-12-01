import dayjs from 'dayjs';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Text } from '../..';
import Card from '../../atoms/Card/Card';
import { GameResult, WithDefaultProps, WithLoadingProps } from '../../types';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

type ResultCardProps = WithDefaultProps<
  WithLoadingProps<{
    gameResult?: GameResult;
  }>
>;

function ResultCardLoadingStateContent() {
  return (
    <div className="flex w-full animate-pulse space-x-4">
      <div className="h-10 w-10 rounded-full bg-slate-700"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 rounded bg-slate-700"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-slate-700"></div>
            <div className="col-span-1 h-2 rounded bg-slate-700"></div>
          </div>
          <div className="h-2 rounded bg-slate-700"></div>
        </div>
      </div>
      <div className="h-10 w-10 rounded-full bg-slate-700"></div>
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
  const p1 = gameResult.teams[0].players[0];
  const p2 = gameResult.teams[1].players[0];

  const timeTaken = gameResult.endTime.diff(gameResult.startTime);

  const duration = dayjs
    .duration(timeTaken, 'milliseconds')
    .format('m[m] s[s]');

  return renderWithChildren(
    <div className="flex justify-between">
      <Text
        type="p"
        className={`${
          gameResult?.winningTeamId === p1?.memorableId ? 'text-green-500' : ''
        }`}
      >{`${p1?.firstName} ${p1?.lastName} - ${p1?.memorableId}`}</Text>
      <Text type="p">{duration}</Text>
      <Text
        type="p"
        className={`${
          gameResult?.winningTeamId === p2?.memorableId ? 'text-green-500' : ''
        }`}
      >{`${p2?.firstName} ${p2?.lastName} - ${p2?.memorableId}`}</Text>
    </div>,
  );
}
