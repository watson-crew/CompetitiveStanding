import { getApiInstance } from '@src/factory/apiFactory';
import UserProfilePage from './UserProfilePage';
import { PageServerParamProps } from './types';
import { notFound } from 'next/navigation';
import {
  GetRecentMatchesByMemorableIdData,
  GetStatsByMemorableIdData,
  User,
} from 'schema';

async function getUser(memorableId: string): Promise<User | undefined> {
  try {
    return getApiInstance().user.getUserByMemorableId(memorableId);
  } catch (err) {
    return undefined;
  }
}

async function getRecentMatches(
  memorableId: string,
): Promise<GetRecentMatchesByMemorableIdData | undefined> {
  try {
    return await getApiInstance().player.getRecentMatchesByMemorableId(
      memorableId,
    );
  } catch (err) {
    return undefined;
  }
}

async function getPlayerStats(
  memorableId: string,
): Promise<GetStatsByMemorableIdData | undefined> {
  try {
    return await getApiInstance().player.getStatsByMemorableId(memorableId);
  } catch (err) {
    return undefined;
  }
}

export default async function ServerUserProfilePage({
  params,
}: PageServerParamProps) {
  const { memorableId } = params;

  const userData = getUser(memorableId);

  const recentMatchesData = getRecentMatches(memorableId);

  const playerStatsData = getPlayerStats(memorableId);

  const [user, recentMatches, playerStats] = await Promise.all([
    userData,
    recentMatchesData,
    playerStatsData,
  ]);

  if (!user) {
    notFound();
  }

  return (
    <UserProfilePage
      user={user}
      recentMatches={recentMatches}
      playerStats={playerStats}
    />
  );
}
