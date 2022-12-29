'use client';

import RecentMatchesOverview from '@src/components/organisms/RecentMatchesOverview/RecentMatchesOverview';
import mapRecentResults from '@src/mappers/recentResultsMapper';
import {
  GameType,
  GetRecentMatchesByMemorableIdData,
  GetStatsByMemorableIdData,
  User,
} from 'schema';
import { GameResult, PlayerCard } from 'ui';

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

type UserPageProps = {
  playerStats?: GetStatsByMemorableIdData;
  recentMatches?: GetRecentMatchesByMemorableIdData;
  user: User;
};

export default function UserProfilePage({
  playerStats,
  recentMatches,
  user,
}: UserPageProps) {
  const userRecentMatches: GameResult[] = recentMatches
    ? mapRecentResults(recentMatches, gameTypes)
    : [];

  return (
    <div className="p-6">
      <PlayerCard
        player={user}
        key={`recent-player-${user.id}`}
        variant="m"
      ></PlayerCard>
      <div className="flex items-center px-4 py-6 ">
        <div className="mr-6 flex-1 text-center">
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
        </div>
      </div>

      <RecentMatchesOverview
        className="row-span-4 h-full w-full"
        recentMatches={userRecentMatches}
        loading={false}
      />
    </div>
  );
}
