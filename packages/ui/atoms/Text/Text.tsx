import React from 'react';
import { WithDefaultProps } from '../../types';
import { twMerge } from 'tailwind-merge';

export type TextType = 'h1' | 'h2' | 'h3' | 'h4' | 'p';

export type TextProps = WithDefaultProps<{
  type: TextType;
  style?: TextType;
}>;

const defaultStyles: Record<TextType, string> = {
  h1: 'text-3xl font-extrabold',
  h2: 'text-2xl font-bold',
  h3: 'text-xl font-semibold',
  h4: 'text-lg font-medium',
  p: 'text-base font-normal',
};

export default function Text({
  type = 'p',
  className,
  children,
  style,
}: TextProps) {
  const styles = [defaultStyles[style || type]];

  const classes = twMerge(styles, className);

  return React.createElement(type, { className: classes }, children);
}
