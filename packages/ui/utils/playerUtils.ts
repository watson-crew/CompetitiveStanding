import { User } from 'schema';

export const getFullName = (player: User) =>
  `${player.firstName} ${player.lastName}`;
