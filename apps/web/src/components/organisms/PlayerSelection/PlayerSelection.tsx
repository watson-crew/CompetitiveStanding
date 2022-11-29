import { useContext, useState } from 'react';
import { User } from 'schema';
import { Banner, Button, TeamSelectionCard, Text } from 'ui';
import { useDispatch } from 'react-redux';
import { addRecentlyPlayed } from '@src/store/reducers/playerSlice';
// import RecentPlayers from '../RecentPlayers/RecentPlayers';
import { ApiContext } from '@src/context/ApiContext';
import RecentPlayers from '../RecentPlayers/RecentPlayers';
// import { initialState } from '@src/pages/signup/state';

// This should be dynamic from somewhere
const gameTypes = {
  1: {
    gameTypeId: 1,
    minNumberOfTeams: 2,
    maxNumberOfTeams: 2,
    minPlayersPerTeam: 1,
    defaultPlayersPerTeam: 1,
  },
};

export default function PlayerSelection() {
  const dispatch = useDispatch();
  const client = useContext(ApiContext);

  // Maybe from query param
  const selectedGameTypeId = 1;

  // Maybe from query param
  const selectedLocationId = 1;

  const numPlayers = 2;

  const [playerNotFoundId, setPlayerNotFoundId] = useState<string | undefined>(
    undefined,
  );
  const [initiateMatchError, setInitiateMatchError] = useState<boolean>(false);

  // Initialise values

  const { minNumberOfTeams, minPlayersPerTeam } = gameTypes[selectedGameTypeId];

  const initialTeams: (string | undefined)[][] = [[undefined], [undefined]];

  const [teams, setTeams] = useState(initialTeams);

  // Initialise values
  const initialPlayers: Record<number, User | undefined> = {};
  const initialLoading: Record<number, boolean> = {};
  const initialErrors: Record<number, boolean> = {};
  for (let i = 0; i < numPlayers; i++) {
    initialPlayers[i] = undefined;
    initialLoading[i] = false;
    initialErrors[i] = false;
  }

  const [savedPlayers, setSavedPlayers] = useState<Record<string, User>>(
    Object.fromEntries(
      Object.values(initialPlayers)
        .filter(player => !!player)
        .map(player => [player?.memorableId, player]),
    ),
  );

  const getPlayer = (playerId?: string) => {
    if (!playerId) return undefined;

    return savedPlayers[playerId] || undefined;
  };

  const onPlayerAddedToTeam = async (
    teamIndex: number,
    memorableId: string,
  ) => {
    // setLoadingForPlayer(id, true);

    try {
      // Try load from cache
      let playerAdded: User = savedPlayers[memorableId];

      if (!playerAdded) {
        playerAdded = await client.user.getUserByMemorableId(memorableId);
      }

      addPlayerToTeam(memorableId, teamIndex);
      setSavedPlayers(savedPlayers => {
        return { ...savedPlayers, [memorableId]: playerAdded };
      });

      // setPlayer(id, await fetchPlayer(memorableId));
      // setErrorForPlayer(id, false);
    } catch (err) {
      setPlayerNotFoundId(memorableId);
      // setErrorForPlayer(id, true);
    } finally {
      // setLoadingForPlayer(id, false);
    }
  };

  const addPlayerToTeam = (playerId: string, teamIndex: number) => {
    setTeams(teams => {
      // Clean this up at some point
      // Probs a better way
      const copy: (string | undefined)[][] = JSON.parse(JSON.stringify(teams));

      copy[teamIndex] = filter([...copy[teamIndex], playerId]);

      return copy;
    });
  };

  const clearPlayerFromTeam = (
    playerId: string | undefined,
    teamIndex: number,
  ) => {
    setTeams(teams => {
      // Probs a better way
      const copy: string[][] = JSON.parse(JSON.stringify(teams));

      copy[teamIndex] = copy[teamIndex].filter(id => id !== playerId);

      if (copy[teamIndex].length === 0) copy[teamIndex] = [undefined];

      return copy;
    });
  };

  const startGame = async () => {
    console.log('Starting game...');

    try {
      await client.matches.initiateNewMatch({
        gameTypeId: selectedGameTypeId,
        locationId: selectedLocationId,
        participatingTeams: Object.values(savedPlayers).map(
          player => player!.memorableId,
        ),
      });
    } catch (err) {
      setInitiateMatchError(true);
    }

    Object.values(savedPlayers).forEach(player => {
      dispatch(addRecentlyPlayed(player!));
    });
  };

  // Check if minimum required players have been selected
  const allPlayersSelected = () => {
    return (
      teams.length >= minNumberOfTeams &&
      teams.every(team => filter(team).length >= minPlayersPerTeam)
    );
  };

  function filter<T>(arr: (T | undefined)[]): T[] {
    return arr.filter(item => !!item) as T[];
  }

  const selectedPlayerIds = (): string[] => {
    return teams.flatMap(
      team => team.filter(playerId => playerId !== undefined) as string[],
    );
  };

  console.log(`Teams ${teams}`);
  console.log(teams);

  return (
    <main className="w-full text-center	">
      {playerNotFoundId && (
        <Banner
          type="info"
          className="m-auto my-5"
          onClose={() => setPlayerNotFoundId(undefined)}
        >
          <Text type="p">
            No player exits with memorable id{' '}
            <span className="font-bold">{playerNotFoundId}</span>
          </Text>
        </Banner>
      )}

      {initiateMatchError && (
        <Banner
          type="error"
          className="m-auto my-5"
          onClose={() => setInitiateMatchError(false)}
        >
          <Text type="p">An error occurred starting the match</Text>
        </Banner>
      )}

      <section className="my-10 flex min-h-fit w-full items-center justify-around align-middle">
        {teams.map((team, teamIndex) => (
          <TeamSelectionCard
            title="Foo"
            key={`team-${teamIndex}`}
            loading={false}
            team={team.map(playerId => getPlayer(playerId))}
            onPlayerAdded={memorableId =>
              onPlayerAddedToTeam(teamIndex, memorableId)
            }
            clearPlayer={playerId => clearPlayerFromTeam(playerId, teamIndex)}
            className="min-h-full basis-2/5"
          />
        ))}

        {/* <PlayerSelectionCard
          title="Player 1"
          player={players[0]}
          loading={loading[0]}
          onIdSubmitted={memorableId => onIdSet(0, memorableId)}
          clearPlayer={() => clearPlayer(0)}
          className="min-h-full basis-2/5"
        />

        <Text type="p">VS</Text>

        <PlayerSelectionCard
          title="Player 2"
          player={players[1]}
          loading={loading[1]}
          onIdSubmitted={memorableId => onIdSet(1, memorableId)}
          clearPlayer={() => clearPlayer(1)}
          className="min-h-full basis-2/5"
        /> */}
      </section>
      <div className="text-center">
        <Button
          text="Start Game"
          disabled={!allPlayersSelected()}
          onClick={startGame}
        />
      </div>
      <RecentPlayers
        className="mx-10"
        onSelected={() => console.log('')}
        disabled={selectedPlayerIds()}
      />
    </main>
  );
}
