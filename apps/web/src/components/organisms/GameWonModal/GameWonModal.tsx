import {
  Button,
  Card,
  PlayerWithRating,
  TeamWithRatings,
  Text,
  WithDefaultProps,
} from 'ui';
import Modal from 'react-modal';
import { RankingChanges } from 'schema';
import { PlayerWithElo } from 'ui';

type GameWonModalProps = WithDefaultProps<{
  playAgain: () => void;
  finish: () => void;
  winningTeam?: TeamWithRatings;
  allTeams: TeamWithRatings[];
  ratingChanges?: RankingChanges;
}>;

const getModalTitle = ({ players }: TeamWithRatings) => {
  if (players.length === 1) {
    return `${players[0].firstName} is the winner!`;
  }

  const winningPlayers = players.map(({ firstName }) => firstName);

  // First x players should be joined by ', '
  const firstX = winningPlayers.slice(0, -1).join(', ');

  // Final should be join by 'and'
  const lastPlayer = winningPlayers[winningPlayers.length - 1];

  return `${[firstX, lastPlayer].join(' and ')} are the winners!`;
};

const withEloChange = (
  player: PlayerWithRating,
  ratingChanges?: RankingChanges,
): PlayerWithRating => {
  if (!ratingChanges) {
    return player;
  }

  return {
    ...player,
    eloChange: ratingChanges[player.memorableId],
  };
};

export default function GameWonModal({
  winningTeam,
  playAgain,
  finish,
  allTeams,
  ratingChanges,
}: GameWonModalProps) {
  const isOpen = !!winningTeam;

  const winningPlayers =
    winningTeam?.players.map(player => withEloChange(player, ratingChanges)) ||
    [];

  const losingPlayers = allTeams
    .filter(
      ({ cumulativeTeamId }) =>
        winningTeam?.cumulativeTeamId !== cumulativeTeamId,
    )
    .flatMap(team =>
      team.players.map(player => withEloChange(player, ratingChanges)),
    );

  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
        },
      }}
    >
      {winningTeam && (
        <div className="w-full">
          <section className="mb-10 text-center">
            <Text type="h1">🎉 {getModalTitle(winningTeam)} 🎉</Text>
          </section>

          <section className="mb-10">
            <Card className="mb-10 w-full bg-emerald-100">
              <Text type="h2" className="mb-2">
                Winners
              </Text>

              <section className="flex justify-center">
                {winningPlayers.map(player => (
                  <PlayerWithElo player={player} variant="l" />
                ))}
              </section>
            </Card>

            <Card className="w-full bg-rose-300">
              <Text type="h2" style="h3" className="mb-2">
                Losers
              </Text>

              <section className="flex justify-center">
                {losingPlayers.map(player => (
                  <PlayerWithElo player={player} variant="m" />
                ))}
              </section>
            </Card>
          </section>

          <section className="flex justify-center gap-10">
            <Button className="w-32" text="Play again" onClick={playAgain} />
            <Button className="w-32" text="Finish" onClick={finish} />
          </section>
        </div>
      )}
    </Modal>
  );
}
