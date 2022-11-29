import { User } from 'schema';
import WithCloseButton from '../../atoms/WithCloseButton/WithCloseButton';
import PlayerCard from '../../molecules/PlayerCard/PlayerCard';
import PlayerIdInput from '../../molecules/PlayerIdInput/PlayerIdInput';
import { WithDefaultProps } from '../../types';
import { twMerge } from 'tailwind-merge';
import Card from '../../atoms/Card/Card';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';

type PlayerSelectionCardProps = WithDefaultProps<{
  player?: User;
  loading: boolean;
  onIdSubmitted: (id: string) => Promise<void>;
  clearPlayer: () => void;
}>;

export default function PlayerSelectionCard({
  player,
  loading,
  onIdSubmitted,
  clearPlayer,
  className,
}: PlayerSelectionCardProps) {
  const containerClasses = twMerge(
    'bg-slate-100 w-full flex justify-center items-center flex-col md:p-10',
    className,
  );

  if (loading) {
    return (
      <Card className={containerClasses}>
        <LoadingSpinner />
      </Card>
    );
  }

  return (
    <Card className={containerClasses}>
      {!player && (
        <PlayerIdInput
          title="Enter your ID"
          onChange={id => onIdSubmitted(id)}
        />
      )}
      {player && (
        <WithCloseButton onClose={clearPlayer}>
          <PlayerCard player={player} />
        </WithCloseButton>
      )}
    </Card>
  );
}
