import { useContext, useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import dayjs from 'dayjs';
import {
  TeamHistoricResultsCard,
  Button,
  Card,
  Timer,
  Text,
  LoadingSpinner,
  TextWithIcon,
  CommonIcons,
} from 'ui';
import { User } from 'schema';
import { useRouter } from 'next/router';
import { Routes } from '@src/types/routes';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearMatchInProgress,
  selectMatchInProgress,
  setMatchInProgress,
} from '@src/store/reducers/matchSlice';
import { ApiContext } from '@src/context/ApiContext';
import { FinishedGameResult, Match, ParticipatingTeam } from '@src/types/games';
import { getStartingPlayer, withUpdatedDetails } from '@src/utils/gamesUtils';
import GameWonModal from '@src/components/organisms/GameWonModal/GameWonModal';
import { buildLobbyUrl, buildLocationUrl } from '@src/utils/routingUtils';
import { generateTeamId } from '@src/utils/teamUtils';
import { getSportIcon } from 'ui/utils/iconUtils';

enum GameEndType {
  REMATCH,
  NEW_TEAMS,
  FINISH,
}

function NoOngoingGameState() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <Text type="p" className="mb-5">
          {"Looks like there's no active game. Hold on while we redirect you."}
        </Text>
        <LoadingSpinner />
      </div>
    </main>
  );
}

export default function Play() {
  const router = useRouter();
  const client = useContext(ApiContext);
  const globalDispatch = useDispatch();

  // This can never be null on this page as we re-route if it is
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [ongoingGame, setOngoingGame] = useState(
    useSelector(selectMatchInProgress),
  );

  const [gameResults, setGameResults] = useState<FinishedGameResult>();
  const [startingPlayer, setStartingPlayer] = useState<User>();

  useEffect(() => {
    if (!ongoingGame && !gameResults) {
      router.push(Routes.Lobby);
    }
  }, [router, ongoingGame, gameResults]);

  useEffect(() => {
    if (ongoingGame) {
      setStartingPlayer(getStartingPlayer(ongoingGame.participatingTeams));
    }
  }, [ongoingGame]);

  if (!ongoingGame) {
    return NoOngoingGameState();
  }

  const gameFinished = !!gameResults?.winningTeam;

  const { gameStartTime, gameType, location, matchId, participatingTeams } =
    ongoingGame;

  const setWinner = async (winningTeam: ParticipatingTeam) => {
    const ratingChanges = await client.matches.recordMatchResults(matchId, {
      updateType: 'SET_WINNER',
      updateDetails: { winningTeamId: winningTeam.cumulativeTeamId },
    });
    globalDispatch(clearMatchInProgress());

    setGameResults({
      winningTeam,
      ratingChanges,
    });
  };

  const abandonMatch = async () => {
    await client.matches.recordMatchResults(matchId, {
      updateType: 'ABANDON_GAME',
    });
    globalDispatch(clearMatchInProgress());
    router.push(Routes.Lobby);
  };

  const handleGameEnd = async (endState: GameEndType) => {
    globalDispatch(clearMatchInProgress());

    if (endState === GameEndType.NEW_TEAMS) {
      router.push(buildLobbyUrl(location, gameType), undefined, {
        shallow: true,
      });
      return;
    }

    if (endState === GameEndType.FINISH) {
      router.push(buildLocationUrl(location));
      return;
    }

    if (endState === GameEndType.REMATCH) {
      const { matchId, playerRatings, historicResults } =
        await client.matches.initiateNewMatch({
          gameTypeId: gameType.id,
          locationId: location.id,
          participatingTeams: participatingTeams.map(team =>
            generateTeamId(team.players),
          ),
        });

      const newMatch: Match = {
        matchId,
        gameStartTime: dayjs(),
        location,
        gameType,
        participatingTeams: withUpdatedDetails(
          participatingTeams,
          playerRatings,
          historicResults,
        ),
      };

      globalDispatch(setMatchInProgress(newMatch));
      setGameResults(undefined);
      setOngoingGame(newMatch);
      router.push(Routes.CurrentMatch, undefined, { shallow: true });
      return;
    }
  };

  return (
    <main className="h-full w-full px-10">
      {!!gameResults && <Confetti />}
      <GameWonModal
        allTeams={participatingTeams}
        winningTeam={gameResults?.winningTeam}
        teamSelection={() => handleGameEnd(GameEndType.NEW_TEAMS)}
        rematch={() => handleGameEnd(GameEndType.REMATCH)}
        finish={() => handleGameEnd(GameEndType.FINISH)}
        ratingChanges={gameResults?.ratingChanges}
        finishedGame={ongoingGame}
      />

      <div id="control-bar" className="flex justify-between">
        <section className="flex gap-10">
          <TextWithIcon
            textProps={{ type: 'p' }}
            icon={CommonIcons.HomeLocation}
          >
            {location.name}
          </TextWithIcon>

          <TextWithIcon
            textProps={{ type: 'p' }}
            icon={getSportIcon(gameType.id)}
          >
            {gameType.name}
          </TextWithIcon>
        </section>
        <section className="flex gap-10">
          <Timer startTime={gameStartTime} isCounting={!gameFinished} />
          <Button
            text="Abandon"
            onClick={abandonMatch}
            className="w-fit text-2xl font-bold"
          />
        </section>
      </div>
      <section className="h-min-content flex w-full items-center space-x-4">
        {participatingTeams.map((team, i) => (
          <TeamHistoricResultsCard
            key={i}
            team={team}
            historicResults={team.historicResults}
            className="h-4/5 w-1/2"
            setAsWinner={() => setWinner(team)}
          />
        ))}
      </section>
      {startingPlayer && (
        <Card className="h-min-content text-m mt-2 w-full text-center font-bold">
          <Text type="p">{startingPlayer.firstName} to start</Text>
        </Card>
      )}
    </main>
  );
}
