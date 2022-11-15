export type Player = {
  id: number,
  name: string,
  score: number
}

export type Game = HeadToHead

export type HeadToHead = {
  id: number,
  player: Player,
  opponent: Player
}