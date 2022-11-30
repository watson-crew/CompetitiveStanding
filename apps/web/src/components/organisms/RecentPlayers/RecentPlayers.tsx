import { WithDefaultProps, PlayerCard, Button, Text } from 'ui';
import { useSelector } from 'react-redux';
import { selectRecentlyPlayed } from '@src/store/reducers/playerSlice';
import { User } from 'schema';

type RecentPlayersProps = WithDefaultProps<{
  onSelected: (user: User) => void;
  disabled?: string[];
  allSlotsFilled?: boolean;
}>;

export default function RecentPlayers({
  className,
  onSelected,
  disabled = [],
  allSlotsFilled = false,
}: RecentPlayersProps) {
  const recentlyPlayedUsers = useSelector(selectRecentlyPlayed);

  const isDisabled = (memorableId: string) => {
    return disabled.includes(memorableId);
  };

  const recentlyPlayedUserCards = () => {
    return recentlyPlayedUsers.map((user, i) => (
      <PlayerCard player={user} key={`recent-player-${i}`}>
        <Button
          text="Add"
          onClick={() => onSelected(user)}
          disabled={allSlotsFilled || isDisabled(user.memorableId)}
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
