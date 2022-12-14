import { GameType, Location, User } from 'schema';
import { Routes } from '@src/types/routes';
import { UrlObject } from 'url';

export const buildLobbyUrl = (
  { id: locationId }: Location,
  { id: gameTypeId }: GameType,
): UrlObject => {
  return {
    pathname: Routes.Lobby,
    query: {
      location: locationId,
      game: gameTypeId,
    },
  };
};

export const buildLocationUrl = ({ urlPath }: Location): string => {
  return Routes.Location.replace('{locationUrlPath}', urlPath);
};

export const buildUserUrl = ({ memorableId }: User): string => {
  return Routes.User.replace('{memorableId}', memorableId);
};
