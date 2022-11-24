import React from 'react';

export type DefaultProps = {
  className?: string;
  children?: React.ReactNode | React.ReactNode[] | string;
};

export type WithDefaultProps<T> = T & DefaultProps;

export type StateDispatcher<T> = React.Dispatch<React.SetStateAction<T>>;
