import {
  ChangeEvent,
  ChangeEventHandler,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
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
import { createInitialState, TeamActionType, teamsReducer } from './state';
import { toObj } from '@src/uilts/objectUtils';

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

type Error = {
  level: 'info' | 'error';
  message: string;
};

function TeamToggle({
  teamsEnabled,
  toggleTeamsEnabled,
}: {
  teamsEnabled: boolean;
  toggleTeamsEnabled: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
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
  );
}

export default function PlayerSelection() {
  // Maybe from query param
  const selectedGameTypeId = 1;

  // Maybe from query param
  const selectedLocationId = 1;

  // Initialise values
  const { minNumberOfTeams, minPlayersPerTeam } = gameTypes[selectedGameTypeId];

  const [teams, teamsDispatch] = useReducer(
    teamsReducer,
    createInitialState(minNumberOfTeams, minPlayersPerTeam),
  );

  const [teamsEnabled, toggleTeamsEnabled] = useReducer(val => !val, false);
  const [error, setError] = useState<Error | undefined>();

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

  const [seenPlayers, setSeenPlayers] = useState<Record<string, User>>(
    toObj(useSelector(selectRecentlyPlayed), 'memorableId'),
  );

  function isPlayerInTeam(team: LoadingPlayer[], memorableId: string): boolean {
    return team.some(
      ({ playerDetails }) => playerDetails?.memorableId === memorableId,
    );
  }

  const onPlayerAddedToTeam = async (
    teamIndex: number,
    memorableId: string,
  ) => {
    if (teams.some(team => isPlayerInTeam(team, memorableId))) {
      setError({
        level: 'info',
        message: `${seenPlayers[memorableId].firstName} is already in a team`,
      });
      return;
    }

    // Set the team as loading
    teamsDispatch({
      actionType: TeamActionType.PlayerLoading,
      payload: { teamIndex: teamIndex },
    });

    try {
      // Try load from cache
      let playerAdded: User = seenPlayers[memorableId];

      if (!playerAdded) {
        playerAdded = await client.user.getUserByMemorableId(memorableId);
      }

      // Add to team
      teamsDispatch({
        actionType: TeamActionType.PlayerDetailsAdded,
        payload: { teamIndex, player: playerAdded },
      });

      // Add to local player cache
      setSeenPlayers(savedPlayers => {
        return { ...savedPlayers, [memorableId]: playerAdded };
      });

      setError(undefined);
    } catch (err) {
      setError({
        level: 'info',
        message: `No player exits with memorable id: ${memorableId}`,
      });
      teamsDispatch({
        actionType: TeamActionType.PlayerResolved,
        payload: { teamIndex },
      });
    }
  };

  const startGame = async () => {
    console.log('Starting game...');

    try {
      await client.matches.initiateNewMatch({
        gameTypeId: selectedGameTypeId,
        locationId: selectedLocationId,
        participatingTeams: Object.values(seenPlayers).map(
          player => player!.memorableId,
        ),
      });
    } catch (err) {
      setError({
        level: 'error',
        message: 'An error occurred starting the match',
      });
    }

    Object.values(seenPlayers).forEach(player => {
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
      <TeamToggle
        teamsEnabled={teamsEnabled}
        toggleTeamsEnabled={toggleTeamsEnabled}
      />

      {teamsEnabled && (
        <Button
          onClick={() => teamsDispatch({ actionType: TeamActionType.AddTeam })}
          disabled={teamConfiguration.maxNumberOfTeams === teams.length}
        >
          <TextWithIcon textProps={{ type: 'p' }} icon={AiOutlineUsergroupAdd}>
            Add Team
          </TextWithIcon>
        </Button>
      )}

      {error && (
        <Banner
          type={error.level}
          className="m-auto my-5"
          onClose={() => setError(undefined)}
        >
          <Text type="p">{error.message}</Text>
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
            increaseTeamSize={() =>
              teamsDispatch({
                actionType: TeamActionType.SlotAdded,
                payload: { teamIndex },
              })
            }
            clearPlayer={player =>
              teamsDispatch({
                actionType: TeamActionType.PlayerRemoved,
                payload: { teamIndex, player },
              })
            }
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
