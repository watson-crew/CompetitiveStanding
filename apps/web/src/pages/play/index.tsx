import { useContext, useEffect, useState } from 'react';
import { useQueryState, queryTypes } from 'next-usequerystate'
import PlayerSelection from '@organisms/PlayerSelection/PlayerSelection';
import { ApiContext } from '@src/context/ApiContext';
import GameComponent from '@src/components/organisms/GameComponent/GameComponent';
import Head from 'next/head';
import {
  TeamHistoricResult,
  User,
  Location,
  InitiateMatchResponse,
  GameType,
} from 'schema';
import { generateTeamId } from '@src/uilts/teamUtils';
import { PlayerWithRating, TeamWithRatings, TextWithIcon } from 'ui';
import { getSportIcon } from '@src/../../../packages/ui/utils/iconUtils';

export default function Index() {
  // Update to use selected location
  function useSelectedLocation(): Location {
    return {
      id: 1,
      name: 'Nottingham',
      urlPath: 'nottingham',
      playerCount: 10,
      availableGames: [
        {
          id: 1,
          name: 'Pool',
          requirements: {
            min: {
              playersPerTeam: 1,
              numberOfTeams: 2,
            },
            max: {
              playersPerTeam: 4,
              numberOfTeams: 3
            },
          },
        },
        {
          id: 2,
          name: 'Darts',
          requirements: {
            min: {
              playersPerTeam: 1,
              numberOfTeams: 2,
            },
            max: {
              playersPerTeam: 4,
              numberOfTeams: 3
            },
          },
        },
      ],
    };
  }

  const [selectedLocation] = useState(useSelectedLocation());
  const [selectedGameType, setSelectedGameType] = useState<GameType>(
    selectedLocation.availableGames[0]
  )
  const client = useContext(ApiContext);
  const [gameQuery] = useQueryState('game', queryTypes.integer.withDefault(selectedLocation.availableGames[0].id))
  const [locationQuery] = useQueryState('location')
  console.log(locationQuery)

  useEffect(() => {
    const selectedGame = selectedLocation.availableGames.find(game => game.id === gameQuery) || selectedLocation.availableGames[0]
    setSelectedGameType(selectedGame)
  }, [gameQuery, selectedLocation])

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

      const teamRecords: TeamWithRatings[] = teams.map(team => {
        return {
          cumulativeTeamId: generateTeamId(team),
          players: team.map(
            player =>
              ({
                ...player,
                elo: playerElos[player.memorableId],
              } as PlayerWithRating),
          ),
        };
      });

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
      <h1 className="text-3xl font-bold underline">Competitive standing</h1>

      <TextWithIcon
          textProps={{ type: 'p' }}
          icon={getSportIcon(selectedGameType.id)}
        >
          {selectedGameType.name}
        </TextWithIcon>

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
          abandonMatch={abandonMatch}
          finishMatch={clearGameDetails}
          setMatchWinner={setWinner}
          playAgain={startMatch}
        />
      )}
    </main>
  );
}
