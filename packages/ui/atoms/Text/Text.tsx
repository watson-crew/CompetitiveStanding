import React from 'react';
import { WithDefaultProps } from '../../types';
import { twMerge } from 'tailwind-merge';

type TextType = 'h1' | 'h2' | 'h3' | 'h4' | 'p';

export type TextProps = WithDefaultProps<{
  type: TextType;
}>;

const defaultStyles: Record<TextType, string> = {
  h1: 'text-3xl font-extrabold',
  h2: 'text-2xl font-bold',
  h3: 'text-xl font-semibold',
  h4: 'text-lg font-medium',
  p: 'text-base font-normal',
};

export default function Text({ type = 'p', className, children }: TextProps) {
  const classes = twMerge(defaultStyles[type], className);

  return React.createElement(type, { className: classes }, children);
}
