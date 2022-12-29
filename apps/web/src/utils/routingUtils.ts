import { GameType, Location, User } from 'schema';
import { Routes } from '@src/types/routes';

export const buildLobbyUrl = (
  { id: locationId }: Location,
  { id: gameTypeId }: GameType,
): string => {
  return `${Routes.Lobby}?location=${locationId}&game=${gameTypeId}`;
};

export const buildLocationUrl = ({ urlPath }: Location): string => {
  return Routes.Location.replace('{locationUrlPath}', urlPath);
};

export const buildUserUrl = ({ memorableId }: User): string => {
  return Routes.User.replace('{memorableId}', memorableId);
};
