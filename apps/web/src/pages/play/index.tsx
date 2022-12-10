import { useContext, useEffect, useState } from 'react';
import { useQueryState, queryTypes } from 'next-usequerystate';
import PlayerSelection from '@organisms/PlayerSelection/PlayerSelection';
import { ApiContext, getApiInstance } from '@src/context/ApiContext';
import GameComponent from '@src/components/organisms/GameComponent/GameComponent';
import Head from 'next/head';
import {
  TeamHistoricResult,
  User,
  InitiateMatchResponse,
  GameType,
} from 'schema';
import { generateTeamId } from '@src/utils/teamUtils';
import {
  CommonIcons,
  PlayerWithRating,
  TeamWithRatings,
  TextWithIcon,
} from 'ui';
import { getSportIcon } from 'ui/utils/iconUtils';
import {
  getLocationStaticPropsFactory,
  PagePropsWithLocation,
} from '@src/utils/staticPropUtils';
import { useDispatch } from 'react-redux';
import { setMatchInProgress } from '@src/store/reducers/matchSlice';
import { ParticipatingTeam } from '@src/types/games';

export const getStaticProps = getLocationStaticPropsFactory(getApiInstance());

export default function Index({ locations }: PagePropsWithLocation) {
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

  // Use a proper react hook to load this from somewhere
  const [matchId, setMatchId] = useState<number>();
  const [teams, setTeams] = useState<TeamWithRatings[]>([]);
  const [historicData, setHistoricData] = useState<
    Record<string, TeamHistoricResult>
  >({});

  // TODO: Figure out what happens if screen is refreshed.
  //       If we haven't stored the local state that a game is happening, we can't re-hydrate state
  //       We should store the current initiateMatch results (i.e matchId, historicResults, teams) in some global persisted state
  //       Then on refresh, we start it up again.

  const startMatch = async (teams: User[][]) => {
    try {
      const { matchId, playerElos, historicResults }: InitiateMatchResponse =
        await client.matches.initiateNewMatch({
          gameTypeId: selectedGameType.id,
          locationId: selectedLocation.id,
          participatingTeams: teams.map(team => generateTeamId(team)),
        });

      const teamRecords: ParticipatingTeam[] = teams.map(team => {
        const teamId = generateTeamId(team);
        return {
          cumulativeTeamId: teamId,
          players: team.map(
            player =>
              ({
                ...player,
                elo: playerElos[player.memorableId],
              } as PlayerWithRating),
          ),
          historicResults: historicResults[teamId],
        };
      });

      globalStateDispatch(
        setMatchInProgress({
          gameType: selectedGameType,
          location: selectedLocation,
          matchId: matchId,
          participatingTeams: teamRecords,
        }),
      );

      setMatchId(matchId);
      setHistoricData(historicResults);
      setTeams(teamRecords);
    } catch (err) {
      throw err;
    }
  };

  const clearGameDetails = () => {
    setMatchId(undefined);
    setTeams([]);
    setHistoricData({});
  };

  const setWinner = async (cumulativeTeamId: string) => {
    return await client.matches.recordMatchResults(matchId!, {
      updateType: 'SET_WINNER',
      updateDetails: { winningTeamId: cumulativeTeamId },
    });
  };

  const abandonMatch = async () => {
    await client.matches.recordMatchResults(matchId!, {
      updateType: 'ABANDON_GAME',
    });
    clearGameDetails();
  };

  const shouldDisplayGame = () =>
    teams.length > 0 && teams.length === Object.keys(historicData).length;
  const shouldDisplayPlayerSelection = () => !shouldDisplayGame();

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
      {shouldDisplayPlayerSelection() && (
        <PlayerSelection
          selectedGameType={selectedGameType}
          selectedLocation={selectedLocation}
          startMatch={startMatch}
        />
      )}

      {shouldDisplayGame() && (
        <GameComponent
          matchId={matchId!}
          historicData={historicData}
          teams={teams}
          gameLocation={selectedLocation}
          gameType={selectedGameType}
          abandonMatch={abandonMatch}
          finishMatch={clearGameDetails}
          setMatchWinner={setWinner}
          playAgain={startMatch}
        />
      )}
    </main>
  );
}
