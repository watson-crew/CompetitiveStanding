import { GameTypeWithRequirements, GetLocationResult } from '@src/types';
import { Location as LocationDto, GameType as GameTypeDto } from 'schema';
import { Mapper } from './generics';

const mapGameType = (gameType: GameTypeWithRequirements): GameTypeDto => {
  return {
    id: gameType.id,
    name: gameType.name,
    requirements: {
      min: {
        numberOfTeams: gameType.requirements.minNumberOfTeams,
        playersPerTeam: gameType.requirements.minPlayersPerTeam,
      },
      max: {
        numberOfTeams: gameType.requirements.maxNumberOfTeams,
        playersPerTeam: gameType.requirements.maxPlayersPerTeam,
      },
    },
  };
};

export const LocationGetMapper: Mapper<GetLocationResult, LocationDto> = {
  map: prismaModel => {
    // We should check the DB for the game type with the most associated game results eventually
    const mostPopularGame =
      prismaModel.availableGames.length > 0
        ? prismaModel.availableGames[0].id
        : undefined;

    return {
      id: prismaModel.id,
      name: prismaModel.name,
      urlPath: prismaModel.urlPath,
      availableGames: prismaModel.availableGames.map(mapGameType),
      playerCount: prismaModel.users.length,
      mostPopularGame,
    } as LocationDto;
  },
};
