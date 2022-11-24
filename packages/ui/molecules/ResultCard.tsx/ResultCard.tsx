import React from 'react';
import { twMerge } from 'tailwind-merge';
import Card from '../../atoms/Card/Card';
import Text from '../../atoms/Text/Text';
import { WithDefaultProps, WithLoadingProps } from '../../types';

type ResultCardProps = WithDefaultProps<WithLoadingProps<unknown>>;

function ResultCardLoadingStateContent() {

  return (
      <div className="w-full flex animate-pulse space-x-4">
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
  )
}

export default function ResultCard({ loading, className }: ResultCardProps) {

  const renderWithChildren = (children: React.ReactNode) => React.createElement(Card, { className: twMerge('w-full', className) }, children)

  if (loading) {
    return renderWithChildren(ResultCardLoadingStateContent())
  }

  return renderWithChildren(
    <>
    <Text type='p'>Actual card content here</Text>
    </>
  )

}
