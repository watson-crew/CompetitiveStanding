import React from 'react';

export type Player = {
  id: number;
  name: string;
  score: number;
};

export type Game = HeadToHead;

export type HeadToHead = {
  id: number;
  player: Player;
  opponent: Player;
};

export type DefaultProps = {
  className?: string;
  children?: React.ReactNode | React.ReactNode[] | string;
};

export type WithDefaultProps<T> = T & DefaultProps;

export type StateDispatcher<T> = React.Dispatch<React.SetStateAction<T>>;
