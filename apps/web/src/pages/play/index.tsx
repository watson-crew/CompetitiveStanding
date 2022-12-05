import { useContext, useState } from 'react';
import PlayerSelection from '@organisms/PlayerSelection/PlayerSelection';
import { ApiContext } from '@src/context/ApiContext';
import GameComponent from '@src/components/organisms/GameComponent/GameComponent';
import Head from 'next/head';
import {
  Team,
  TeamHistoricResult,
  User,
  Location,
  InitiateMatchResponse,
  GameType,
} from 'schema';
import { generateTeamId } from '@src/uilts/teamUtils';

export default function Index() {
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
              numberOfTeams: 3, // Just for testing purposes
            },
          },
        },
      ],
    };
  }

  const client = useContext(ApiContext);

  // Use a proper react hook to load this from somewhere
  const [selectedLocation] = useState(useSelectedLocation());

  // Use a proper react hook to load this from somewhere
  // TODO: Look at passing game and location in as props
  const [selectedGameType] = useState<GameType>(
    selectedLocation.availableGames[0],
  );

  const [matchId, setMatchId] = useState<number>();
  const [teams, setTeams] = useState<Team[]>([]);
  const [historicData, setHistoricData] = useState<
    Record<string, TeamHistoricResult>
  >({});

  // TODO: Figure out what happens if screen is refreshed.
  //       If we haven't stored the local state that a game is happening, we can't re-hydrate state
  //       We should store the current initiateMatch results (i.e matchId, historicResults, teams) in some global persisted state
  //       Then on refresh, we start it up again.

  const startMatch = async (teams: User[][]) => {
    try {
      const response: InitiateMatchResponse =
        await client.matches.initiateNewMatch({
          gameTypeId: selectedGameType.id,
          locationId: selectedLocation.id,
          participatingTeams: teams.map(team => generateTeamId(team)),
        });

      const teamRecords: Team[] = teams.map(team => {
        return {
          cumulativeTeamId: generateTeamId(team),
          players: team,
        };
      });

      setMatchId(response.matchId);
      setHistoricData(response.historicResults);
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
    await client.matches.recordMatchResults(matchId!, {
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
