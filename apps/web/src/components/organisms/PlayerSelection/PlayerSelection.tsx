import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { User } from 'schema';
import {
  Banner,
  Button,
  TeamSelectionCard,
  Text,
  Toggle,
  LoadingPlayer,
} from 'ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  addRecentlyPlayed,
  selectRecentlyPlayed,
} from '@src/store/reducers/playerSlice';
// import RecentPlayers from '../RecentPlayers/RecentPlayers';
import { ApiContext } from '@src/context/ApiContext';
import RecentPlayers from '../RecentPlayers/RecentPlayers';
import TextWithIcon from '@src/../../../packages/ui/molecules/TextWithIcon/TextWithIcon';
// import { initialState } from '@src/pages/signup/state';
import {
  AiOutlineTeam,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai';

// This should be dynamic from somewhere
const gameTypes = {
  1: {
    gameTypeId: 1,
    minNumberOfTeams: 2,
    maxNumberOfTeams: 2,
    minPlayersPerTeam: 1,
    defaultPlayersPerTeam: 1,
    maxPlayersPerTeam: 2,
  },
};

type TeamConfiguration = {
  maxNumberOfTeams: number;
  maxPlayersPerTeam: number;
};

export default function PlayerSelection() {
  const [teamsEnabled, setTeamsEnabled] = useState(false);

  const toggleTeamsEnabled = (_e: ChangeEvent<HTMLInputElement>) => {
    setTeamsEnabled(!teamsEnabled);
  };

  const [teamConfiguration, setTeamConfiguration] = useState<TeamConfiguration>(
    { maxNumberOfTeams: 1, maxPlayersPerTeam: 1 },
  );

  useEffect(() => {
    if (teamsEnabled) {
      setTeamConfiguration({ maxNumberOfTeams: 4, maxPlayersPerTeam: 4 });
    } else {
      setTeamConfiguration({ maxNumberOfTeams: 1, maxPlayersPerTeam: 1 });
    }
  }, [teamsEnabled]);

  const dispatch = useDispatch();
  const client = useContext(ApiContext);

  // Maybe from query param
  const selectedGameTypeId = 1;

  // Maybe from query param
  const selectedLocationId = 1;

  const [playerNotFoundId, setPlayerNotFoundId] = useState<string | undefined>(
    undefined,
  );

  const [playerAlreadyInTeamError, setPlayerAlreadyInTeamError] =
    useState(false);

  const [initiateMatchError, setInitiateMatchError] = useState<boolean>(false);

  // Initialise values

  const { minNumberOfTeams, minPlayersPerTeam } = gameTypes[selectedGameTypeId];

  const initialTeams: LoadingPlayer[][] = [
    [{ loading: false }],
    [{ loading: false }],
  ];

  const [teams, setTeams] = useState(initialTeams);

  const initialPlayers = useSelector(selectRecentlyPlayed);

  const [savedPlayers, setSavedPlayers] = useState<Record<string, User>>(
    Object.fromEntries(
      Object.values(initialPlayers)
        .filter(player => !!player)
        .map(player => [player?.memorableId, player]),
    ),
  );

  const setLoadingForTeam = (teamIndex: number, isLoading: boolean) => {
    setTeams(teams => {
      const copy: LoadingPlayer[][] = JSON.parse(JSON.stringify(teams));
      const loadingTeam = copy[teamIndex];

      loadingTeam[loadingTeam.length - 1].loading = isLoading;

      return copy;
    });
  };

  const increaseTeamSize = async (teamIndex: number) => {
    setTeams(teams => {
      const copy: LoadingPlayer[][] = JSON.parse(JSON.stringify(teams));

      const toIncrease = copy[teamIndex];

      copy[teamIndex] = [...toIncrease, { loading: false }];

      return copy;
    });
  };

  const onPlayerAddedToTeam = async (
    teamIndex: number,
    memorableId: string,
  ) => {
    // Make sure player is not already in a team

    if (
      teams.some(team =>
        team.some(player => player.playerDetails?.memorableId === memorableId),
      )
    ) {
      setPlayerAlreadyInTeamError(true);
      return;
    }
    setPlayerAlreadyInTeamError(false);

    setLoadingForTeam(teamIndex, true);

    try {
      // Try load from cache
      let playerAdded: User = savedPlayers[memorableId];

      if (!playerAdded) {
        playerAdded = await client.user.getUserByMemorableId(memorableId);
      }

      // ADd to team
      addPlayerToTeam(playerAdded, teamIndex);

      // Add to local player cache
      setSavedPlayers(savedPlayers => {
        return { ...savedPlayers, [memorableId]: playerAdded };
      });

      // setPlayer(id, await fetchPlayer(memorableId));
      // setErrorForPlayer(id, false);
    } catch (err) {
      setPlayerNotFoundId(memorableId);
      // setErrorForPlayer(id, true);
    } finally {
      setLoadingForTeam(teamIndex, false);
    }
  };

  const addPlayerToTeam = (playerDetails: User, teamIndex: number) => {
    setTeams(teams => {
      // Clean this up at some point
      // Probs a better way
      const copy: LoadingPlayer[][] = JSON.parse(JSON.stringify(teams));

      copy[teamIndex] = filter([
        ...copy[teamIndex],
        { playerDetails, loading: false },
      ]);

      return copy;
    });
  };

  const addTeam = () => {
    setTeams(teams => {
      return [...teams, [{ loading: false }]];
    });
  };

  const clearPlayerFromTeam = (
    playerId: string | undefined,
    teamIndex: number,
  ) => {
    setTeams(teams => {
      // Probs a better way
      const copy: LoadingPlayer[][] = JSON.parse(JSON.stringify(teams));

      copy[teamIndex] = copy[teamIndex].filter(
        item => item.playerDetails?.memorableId !== playerId,
      );

      if (copy[teamIndex].length === 0) copy[teamIndex] = [{ loading: false }];

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

  function filter(arr: LoadingPlayer[]): LoadingPlayer[] {
    return arr.filter(item => !!item.playerDetails);
  }

  const selectedPlayerIds = (): string[] => {
    return teams.flatMap(
      team =>
        team
          .filter(item => item.playerDetails !== undefined)
          .map(item => item.playerDetails?.memorableId) as string[],
    );
  };

  const hasOpenSlot = (arr: LoadingPlayer[]): boolean => {
    return arr.some(item => item.playerDetails === undefined);
  };

  const nextTeamIndex = (): number => {
    let shortest: number = Number.MAX_VALUE;
    let shortestIndex: number = Number.MAX_VALUE;

    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];

      if (hasOpenSlot(team)) {
        if (team.length === 1) {
          return i;
        } else if (team.length < shortest) {
          shortest = team.length;
          shortestIndex = i;
        }
      }
    }

    return shortestIndex;
  };

  return (
    <section className="w-full text-center">
      <Toggle
        isToggled={teamsEnabled}
        onChange={toggleTeamsEnabled}
        defaultColor="yellow-500"
        toggledColor="cyan-800"
        beforeChild={
          <TextWithIcon
            textProps={{ type: 'p' }}
            icon={AiOutlineUser}
            reversed={true}
          >
            Singles
          </TextWithIcon>
        }
        afterChild={
          <TextWithIcon textProps={{ type: 'p' }} icon={AiOutlineTeam}>
            Teams
          </TextWithIcon>
        }
      />

      {teamsEnabled && (
        <Button
          onClick={addTeam}
          disabled={teamConfiguration.maxNumberOfTeams === teams.length}
        >
          <TextWithIcon textProps={{ type: 'p' }} icon={AiOutlineUsergroupAdd}>
            Add Team
          </TextWithIcon>
        </Button>
      )}

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
      {playerAlreadyInTeamError && (
        <Banner
          type="info"
          className="m-auto my-5"
          onClose={() => setPlayerNotFoundId(undefined)}
        >
          <Text type="p">
            Player is already in a team
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
            teamNumber={teamIndex}
            key={`team-${teamIndex}`}
            team={team}
            onPlayerAdded={memorableId =>
              onPlayerAddedToTeam(teamIndex, memorableId)
            }
            increaseTeamSize={() => increaseTeamSize(teamIndex)}
            clearPlayer={playerId => clearPlayerFromTeam(playerId, teamIndex)}
            maxPlayersPerTeam={teamConfiguration.maxPlayersPerTeam}
            className="min-h-full basis-2/5"
          />
        ))}
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
        onSelected={user =>
          onPlayerAddedToTeam(nextTeamIndex(), user.memorableId)
        }
        disabled={selectedPlayerIds()}
      />
    </section>
  );
}
