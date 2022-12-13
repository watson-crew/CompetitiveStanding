'use client';

import { useContext, useEffect, useState } from 'react';
import { useQueryState, queryTypes } from 'next-usequerystate';
import PlayerSelection from '@organisms/PlayerSelection/PlayerSelection';
import { ApiContext } from '@src/context/ApiContext';
import { User, InitiateMatchResponse, GameType } from 'schema';
import { generateTeamId } from '@src/utils/teamUtils';
import { CommonIcons, LoadingSpinner, Text, TextWithIcon } from 'ui';
import { getSportIcon } from 'ui/utils/iconUtils';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMatchInProgress,
  setMatchInProgress,
} from '@src/store/reducers/matchSlice';
import { ParticipatingTeam } from '@src/types/games';
import dayjs from 'dayjs';
import { withRatings } from '@src/utils/gamesUtils';
import { useRouter } from 'next/navigation';
import { Routes } from '@src/types/routes';
import { PagePropsWithLocation } from '@src/types/staticProps';

function OngoingGameState() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <Text type="p" className="mb-5">
          {
            "Looks like there's already a game in progress. Hold on while we redirect you."
          }
        </Text>
        <LoadingSpinner />
      </div>
    </main>
  );
}

export default function LobbyPage({ locations }: PagePropsWithLocation) {
  const router = useRouter();
  const globalStateDispatch = useDispatch();

  const ongoingMatch = useSelector(selectMatchInProgress);

  useEffect(() => {
    if (ongoingMatch) {
      router.push(Routes.CurrentMatch);
    }
  }, [ongoingMatch, router]);

  const [selectedLocationId] = useQueryState(
    'location',
    queryTypes.integer.withDefault(Object.values(locations)[0].id),
  );
  const [selectedLocation, setSelectedLocation] = useState(
    locations[selectedLocationId],
  );

  const [selectedGameType, setSelectedGameType] = useState<GameType>(
    selectedLocation.availableGames[0],
  );
  const client = useContext(ApiContext);
  const [selectedGameTypeId] = useQueryState(
    'game',
    queryTypes.integer.withDefault(selectedLocation.availableGames[0].id),
  );

  useEffect(() => {
    setSelectedLocation(locations[selectedLocationId]);
  }, [locations, selectedLocationId]);

  useEffect(() => {
    const selectedGame =
      selectedLocation.availableGames.find(
        game => game.id === selectedGameTypeId,
      ) || selectedLocation.availableGames[0];
    setSelectedGameType(selectedGame);
  }, [selectedGameTypeId, selectedLocation]);

  useEffect(() => {
    router.prefetch(Routes.CurrentMatch);
  }, [router]);

  const startMatch = async (teams: User[][]) => {
    try {
      const { matchId, playerRatings, historicResults }: InitiateMatchResponse =
        await client.matches.initiateNewMatch({
          gameTypeId: selectedGameType.id,
          locationId: selectedLocation.id,
          participatingTeams: teams.map(team => generateTeamId(team)),
        });

      const teamRecords: ParticipatingTeam[] = teams.map(team => {
        const teamId = generateTeamId(team);
        return {
          cumulativeTeamId: teamId,
          players: withRatings(team, playerRatings),
          historicResults: historicResults[teamId],
        };
      });

      globalStateDispatch(
        setMatchInProgress({
          gameType: selectedGameType,
          gameStartTime: dayjs(),
          location: selectedLocation,
          matchId: matchId,
          participatingTeams: teamRecords,
        }),
      );

      router.push(Routes.CurrentMatch);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  if (ongoingMatch) {
    return <OngoingGameState />;
  }

  return (
    <main className="flex h-screen flex-col items-center px-10 xl:px-28">
      <h1 className="text-3xl font-bold underline">Lobby</h1>

      <div className="flex">
        <TextWithIcon textProps={{ type: 'p' }} icon={CommonIcons.HomeLocation}>
          {selectedLocation.name}
        </TextWithIcon>

        <TextWithIcon
          textProps={{ type: 'p' }}
          icon={getSportIcon(selectedGameType.id)}
        >
          {selectedGameType.name}
        </TextWithIcon>
      </div>

      {/* We should probably split this up a bit now */}
      <PlayerSelection
        selectedGameType={selectedGameType}
        selectedLocation={selectedLocation}
        startMatch={startMatch}
      />
    </main>
  );
}
