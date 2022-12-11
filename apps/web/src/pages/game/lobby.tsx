import { useContext, useEffect, useState } from 'react';
import { useQueryState, queryTypes } from 'next-usequerystate';
import PlayerSelection from '@organisms/PlayerSelection/PlayerSelection';
import { ApiContext, getApiInstance } from '@src/context/ApiContext';
import Head from 'next/head';
import { User, InitiateMatchResponse, GameType } from 'schema';
import { generateTeamId } from '@src/utils/teamUtils';
import { CommonIcons, TextWithIcon } from 'ui';
import { getSportIcon } from 'ui/utils/iconUtils';
import {
  getLocationStaticPropsFactory,
  PagePropsWithLocation,
} from '@src/utils/staticPropUtils';
import { useDispatch } from 'react-redux';
import { setMatchInProgress } from '@src/store/reducers/matchSlice';
import { ParticipatingTeam } from '@src/types/games';
import dayjs from 'dayjs';
import { withRatings } from '@src/utils/gamesUtils';
import { useRouter } from 'next/router';
import { Routes } from '@src/types/routes';

export const getStaticProps = getLocationStaticPropsFactory(getApiInstance());

export default function Index({ locations }: PagePropsWithLocation) {
  const router = useRouter();
  const globalStateDispatch = useDispatch();

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

  return (
    <main className="flex h-screen flex-col items-center px-10 xl:px-28">
      <Head>
        <title>Competitive Standing | Play</title>
      </Head>
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
