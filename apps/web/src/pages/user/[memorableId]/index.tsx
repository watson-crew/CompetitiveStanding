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

  // const [playerStats, setPlayerStats] = useState<GetStatsByMemorableIdData>();

  const fetchRecentGames = async (user: User) => {
    const data = await api.player.getRecentMatchesByMemorableId(
      user.memorableId,
    );

    setRecentMatches(mapRecentResults(data, gameTypes));
    setLoadingRecentMatches(false);

    // const stats = await api.player.getStatsByMemorableId(user.memorableId);
    // setPlayerStats(stats);
  };

  useEffect(() => {
    fetchRecentGames(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="p-6">
      <PlayerCard
        player={user}
        key={`recent-player-${user.id}`}
        variant="m"
      ></PlayerCard>
      <div className="flex items-center   px-4 py-6 ">
        {/* <div className="mr-6 flex-1 text-center">
          <h3 className="text-lg font-bold leading-tight">Games Played</h3>
          <div className="text-gray-700">{playerStats?.gamesPlayed}</div>
        </div>
        <div className="mr-6 flex-1 text-center">
          <h3 className="text-lg font-bold leading-tight">Games Won</h3>
          <div className="text-gray-700">{playerStats?.gamesWon}</div>
        </div>
        <div className="mr-6 flex-1 text-center">
          <h3 className="text-lg font-bold leading-tight">Win Percentage</h3>
          <div className="text-gray-700">
            {playerStats?.winPercentage}
            {playerStats?.winPercentage && '%'}
          </div>
        </div>
        <div className="mr-6 flex-1 text-center">
          <h3 className="text-lg font-bold leading-tight">Best Friend</h3>
          <div className="text-gray-700">
            {playerStats?.bestFriend?.firstName}
          </div>
        </div>
        <div className="mr-6 flex-1 text-center">
          <h3 className="text-lg font-bold leading-tight">Easy Pickings</h3>
          <div className="text-gray-700">
            {playerStats?.easyPickings?.firstName}
          </div>
        </div>
        <div className="flex-1 text-center">
          <h3 className="text-lg font-bold leading-tight">Nemesis</h3>
          <div className="text-gray-700">{playerStats?.nemesis?.firstName}</div>
        </div> */}
      </div>

      <RecentMatchesOverview
        className="row-span-4 h-full w-full"
        recentMatches={recentMatches}
        loading={loadingRecentMatches}
      />
    </div>
  );
}
