import Link from 'next/link';
import { User } from 'schema';
import PlayerImage from '../../../../../../packages/ui/atoms/PlayerImage/PlayerImage';
import { buildUserUrl } from '@src/utils/routingUtils';

export default function RankedPlayerTableCard({ user }: { user: User }) {
  const userName = `${user.firstName} ${user.lastName}`;
  return (
    <Link href={buildUserUrl(user)}>
      <PlayerImage
        src={user.profilePicture}
        playerName={userName}
        className={'mr-2 rounded-full px-4 py-2'}
      />
      {userName}
    </Link>
  );
}
