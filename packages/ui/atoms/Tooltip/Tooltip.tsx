'use client';

import { DefaultProps } from '../../types';
import { MdInfoOutline } from 'react-icons/md';

import { twMerge } from 'tailwind-merge';
import ReactTooltip from 'react-tooltip';

export default function Tooltip({ children, className, id }: DefaultProps) {
  return (
    <span>
      <MdInfoOutline
        size={16}
        data-tip
        data-for={`${id}-tooltip`}
        className={twMerge(
          'transition-fill duration-200 hover:cursor-pointer hover:fill-slate-300',
          className,
        )}
      />
      <ReactTooltip id={`${id}-tooltip`} getContent={_dataTip => children} />
    </span>
  );
}
