import { WithDefaultProps, PlayerCard, Button, Text, Card, CommonIcons } from 'ui';
import { useSelector } from 'react-redux';
import { selectRecentlyPlayed } from '@src/store/reducers/playerSlice';
import { User } from 'schema';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import WithScrollbar from '@src/../../../packages/ui/atoms/WithScrollbar/WithScrollbar';

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
    return recentlyPlayedUsers.reverse().map((user, i) => (
      <PlayerCard player={user} key={`recent-player-${i}`} variant="s">
      <Button
          onClick={() => onSelected(user)}
          disabled={allSlotsFilled || isDisabled(user.memorableId)}
          className="rounded-full px-2 py-2"
        >
          <CommonIcons.Plus></CommonIcons.Plus>
        </Button>
      </PlayerCard>
    ));
  };

  return (
    <Card className={twMerge('w-full text-left', className)}>
      <Text type="h2">Recent players</Text>

      {!hasRecentPlayers &&
      <div className="text-center">
        <Text type="p">No recent players</Text>
      </div>
      }

      {hasRecentPlayers &&
        <WithScrollbar className="flex-grow items-center">
          {recentlyPlayedUserCards()}
        </WithScrollbar>
      }
    </Card>
  );
}
