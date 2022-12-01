import { WithDefaultProps, PlayerCard, Button, Text, Card } from 'ui';
import { useSelector } from 'react-redux';
import { selectRecentlyPlayed } from '@src/store/reducers/playerSlice';
import { User } from 'schema';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';

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

  const [hasRecentPlayers, setHasRecentPlayers] = useState(false);

  useEffect(() => {
    setHasRecentPlayers(recentlyPlayedUsers.length > 0);
  }, [recentlyPlayedUsers]);

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
    <Card className={twMerge('w-full text-left', className)}>
      <Text type="h2">Recent players</Text>
      <div className="min-h-20 flex h-full w-full flex-row justify-center gap-x-4 overflow-scroll">
        {hasRecentPlayers && recentlyPlayedUserCards()}
        {!hasRecentPlayers && <Text type="p">No recent players</Text>}
      </div>
    </Card>
  );
}
