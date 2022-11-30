import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { GameType, Location, User } from 'schema';
import { Banner, Button, TeamSelectionCard, Text, TextWithIcon } from 'ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  addRecentlyPlayed,
  selectRecentlyPlayed,
} from '@src/store/reducers/playerSlice';
import { ApiContext } from '@src/context/ApiContext';
import RecentPlayers from '../RecentPlayers/RecentPlayers';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { createInitialState, TeamActionType, teamsReducer } from './state';
import { filterFalsey, toObj } from '@src/uilts/collectionUtils';
import TeamToggle from '@src/components/atoms/TeamToggle/TeamToggle';
import { Error } from '@src/types/common';
import {
  getAllPlayerIds,
  getNextTeamWithOpenSlot,
  isPlayerInTeam,
  minimumRequirementsMet,
} from '@src/uilts/gamesUtils';
import { GameRequirements, GameRequirement } from '@src/types/games';
import { generateTeamId } from '@src/uilts/teamUtils';

function useSelectedGameType(): GameType & { requirements: GameRequirements } {
  return {
    id: 1,
    name: 'Pool',
    maxNumberOfPlayers: 2, // Obsolete now
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
  };
}

function useSelectedLocation(): Location {
  return {
    id: 1,
    name: 'Nottingham',
    urlPath: 'nottingham',
  };
}

function createGameRequirementDispatcher(
  { min, max }: GameRequirements,
  setter: Dispatch<SetStateAction<GameRequirement>>,
): (isToggled: boolean) => void {
  return (isToggled: boolean) => {
    console.log(`createGameRequirementDispatcher: ${isToggled}`);
    setter(isToggled ? max : min);
  };
}

export default function PlayerSelection() {
  // Use a proper react hook to load this from somewhere
  const selectedGameType = useSelectedGameType();

  // Use a proper react hook to load this from somewhere
  const selectedLocation = useSelectedLocation();

  const [gameRequirements, setGameRequirements] = useState<GameRequirement>(
    selectedGameType.requirements.min,
  );
  const [teamWithOpenSlot, setTeamWithOpenSlot] = useState<number>(-1);

  const [teams, teamsDispatch] = useReducer(
    teamsReducer,
    createInitialState(gameRequirements),
  );

  useEffect(() => {
    console.log('rendered');
  });

  const additionalTeamsEnabled =
    gameRequirements.numberOfTeams >
    selectedGameType.requirements.min.numberOfTeams;

  useEffect(() => {
    setTeamWithOpenSlot(getNextTeamWithOpenSlot(teams));
  }, [teams]);

  const [error, setError] = useState<Error | undefined>();

  const toggleTeamsEnabled = createGameRequirementDispatcher(
    selectedGameType.requirements,
    setGameRequirements,
  );

  const reduxDispatch = useDispatch();
  const client = useContext(ApiContext);

  // A local cache of players who have been loaded
  const [seenPlayers, setSeenPlayers] = useState<Record<string, User>>(
    toObj(useSelector(selectRecentlyPlayed), 'memorableId'),
  );

  async function getPlayer(memorableId: string): Promise<User> {
    return (
      seenPlayers[memorableId] ||
      (await client.user.getUserByMemorableId(memorableId))
    );
  }

  async function onPlayerAddedToTeam(
    teamIndex: number,
    playerMemorableId: string,
  ) {
    if (teamIndex < 0) {
      setError({
        level: 'info',
        message: 'All teams are currently full',
      });
      return;
    }

    if (teams.some(team => isPlayerInTeam(team, playerMemorableId))) {
      setError({
        level: 'info',
        message: `${seenPlayers[playerMemorableId].firstName} is already in a team`,
      });
      return;
    }

    // Set the team as loading
    teamsDispatch({
      actionType: TeamActionType.PlayerLoading,
      payload: { teamIndex: teamIndex },
    });

    try {
      const player = await getPlayer(playerMemorableId);

      // Add to team
      teamsDispatch({
        actionType: TeamActionType.PlayerDetailsAdded,
        payload: { teamIndex, player },
      });

      // Add to local player cache
      setSeenPlayers(savedPlayers => {
        return { ...savedPlayers, [playerMemorableId]: player };
      });

      setError(undefined);
    } catch (err) {
      setError({
        level: 'info',
        message: `No player exists with memorable id: ${playerMemorableId}`,
      });
      teamsDispatch({
        actionType: TeamActionType.PlayerResolved,
        payload: { teamIndex },
      });
    }
  }

  async function startGame() {
    const participatingTeams = teams.map(
      team =>
        filterFalsey(team, 'playerDetails').map(
          player => player.playerDetails,
        ) as User[],
    );

    try {
      await client.matches.initiateNewMatch({
        gameTypeId: selectedGameType.id,
        locationId: selectedLocation.id,
        participatingTeams: participatingTeams.map(team =>
          generateTeamId(team),
        ),
      });
    } catch (err) {
      setError({
        level: 'error',
        message: 'An error occurred starting the match',
      });
    }

    // Save all recent players
    participatingTeams
      .flatMap(team => team)
      .forEach(player => {
        reduxDispatch(addRecentlyPlayed(player));
      });
  }

  return (
    <section className="w-full text-center">
      <TeamToggle
        initialState={false}
        toggleTeamsEnabled={toggleTeamsEnabled}
      />

      {additionalTeamsEnabled && (
        <Button
          onClick={() => teamsDispatch({ actionType: TeamActionType.AddTeam })}
          disabled={gameRequirements.numberOfTeams === teams.length}
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
            maxPlayersPerTeam={gameRequirements.playersPerTeam}
            className="min-h-full basis-2/5"
          />
        ))}
      </section>
      <div className="text-center">
        <Button
          text="Start Game"
          disabled={
            !minimumRequirementsMet(teams, selectedGameType.requirements.min)
          }
          onClick={startGame}
        />
      </div>
      <RecentPlayers
        className="mx-10"
        onSelected={user =>
          onPlayerAddedToTeam(teamWithOpenSlot, user.memorableId)
        }
        allSlotsFilled={teamWithOpenSlot < 0}
        disabled={getAllPlayerIds(teams)}
      />
    </section>
  );
}
