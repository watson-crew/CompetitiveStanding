import { WithDefaultProps, PlayerCard, Button, Text } from 'ui';
import { useSelector } from 'react-redux';
import { selectRecentlyPlayed } from '@src/store/reducers/playerSlice';
import { User } from 'schema';

type RecentPlayersProps = WithDefaultProps<{
  onSelected: (user: User) => void;
  disabled?: string[];
}>;

export default function RecentPlayers({
  className,
  onSelected,
  disabled,
}: RecentPlayersProps) {
  const recentlyPlayedUsers = useSelector(selectRecentlyPlayed);

  const onClick = (user: User) => {
    onSelected(user);
  };

  const isDisabled = (memorableId: string) => {
    if (!disabled) {
      return false;
    }
    return disabled.includes(memorableId);
  };

  const recentlyPlayedUserCards = () => {
    return recentlyPlayedUsers.map((user, i) => (
      <PlayerCard player={user} key={`recent-player-${i}`}>
        <Button
          text="Add"
          onClick={() => onClick(user)}
          disabled={isDisabled(user.memorableId)}
        />
      </PlayerCard>
    ));
  };

  return (
    <section className={className}>
      <Text type="h2">Recently Played</Text>
      <div className="flex h-full w-full flex-row gap-x-4 overflow-scroll">
        {recentlyPlayedUserCards()}
      </div>
    </section>
  );
}
