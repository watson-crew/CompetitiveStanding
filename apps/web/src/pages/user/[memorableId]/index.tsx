import { GameType, User } from 'schema';
import { ApiContext, getApiInstance } from '@src/context/ApiContext';
import { PagePropsWithLocation } from '@src/utils/staticPropUtils';
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { GameResult, RecentMatchesOverview, PlayerCard } from 'ui';
import { useContext, useEffect, useState } from 'react';
import mapRecentResults from '@src/mappers/recentResultsMapper';

type UserPageProps = PagePropsWithLocation & {
  user: User;
};

type UserPageDynamicPath = { memorableId: string };

const gameTypes: Record<number, Omit<GameType, 'requirements'>> = {
  1: {
    id: 1,
    name: 'Pool',
  },
  2: {
    id: 2,
    name: 'Darts',
  },
  3: {
    id: 3,
    name: 'Table Tennis',
  },
};

export async function getStaticPaths(
  _context: GetStaticPathsContext,
): Promise<GetStaticPathsResult<UserPageDynamicPath>> {
  const users = await getApiInstance().users.getAllUsers();

  return {
    paths: users.map(user => ({
      params: { memorableId: user.memorableId },
    })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<UserPageDynamicPath>): Promise<
  GetStaticPropsResult<UserPageProps>
> {
  if (!params) throw new Error();

  const user = await getApiInstance().user.getUserByMemorableId(
    params.memorableId,
  );

  const locations = await getApiInstance().location.getAllLocations();

  if (!locations) throw new Error();

  return { props: { locations, user } };
}

export default function Index({ user }: UserPageProps) {
  const api = useContext(ApiContext);

  const [recentMatches, setRecentMatches] = useState<GameResult[]>([]);
  const [loadingRecentMatches, setLoadingRecentMatches] = useState(true);

  const fetchRecentGames = async (user: User) => {
    const data = await api.player.getRecentMatchesByMemorableId(
      user.memorableId,
    );

    // const stats = await api.player.getRecentMatchesByMemorableId(
    //   user.memorableId,
    // );

    setRecentMatches(mapRecentResults(data, gameTypes));
    setLoadingRecentMatches(false);
  };

  useEffect(() => {
    fetchRecentGames(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <PlayerCard
        player={user}
        key={`recent-player-${user.id}`}
        variant="m"
      ></PlayerCard>
      <RecentMatchesOverview
        className="row-span-4 h-full w-full"
        recentMatches={recentMatches}
        loading={loadingRecentMatches}
      />
    </>
  );
}
