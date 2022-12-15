import Link from 'next/link';
import { User } from 'schema';
import PlayerImage from '../PlayerImage/PlayerImage';
export default function RankedPlayerTableCard({ user }: { user: User }) {
  const userName = `${user.firstName} ${user.lastName}`;
  return (
    <Link href="#">
      <PlayerImage
        src={user.profilePicture}
        playerName={userName}
        className={'mr-2 rounded-full px-4 py-2'}
      />
      {userName}
    </Link>
  );
}
