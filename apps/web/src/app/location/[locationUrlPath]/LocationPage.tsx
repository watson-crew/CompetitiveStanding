'use client';

import { GameType, Location, RankedPlayer, ResultFilterType } from 'schema';
import {
  AvailableGamesOverview,
  Card,
  GameResult,
  RecentMatchesOverview,
  Text,
  TopPlayersOverview,
} from 'ui';
import { ApiContext } from '@src/context/ApiContext';
import { useContext, useEffect, useState } from 'react';
import mapRecentResults from '@src/mappers/recentResultsMapper';
import { buildLobbyUrl } from '@src/utils/routingUtils';

type LocationPageProps = {
  location: Location;
};

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

export default function LocationPage({ location }: LocationPageProps) {
  const api = useContext(ApiContext);

  const [loadingRecentMatches, setLoadingRecentMatches] = useState(true);
  const [recentMatches, setRecentMatches] = useState<GameResult[]>([]);

  const [loadingRankedPlayers, setLoadingRankedPlayers] = useState(true);
  const [rankedPlayers, setRankedPlayers] =
    useState<Record<ResultFilterType, RankedPlayer[]>>();

  useEffect(() => {
    const fetchRecentGames = async (location: Location) => {
      const data = await api.matches.getRecentMatches({
        locationId: location.id,
      });

      setRecentMatches(mapRecentResults(data, gameTypes));

      setLoadingRecentMatches(false);
    };

    const fetchRankings = async (location: Location) => {
      // TODO: Look at where game type should come from
      const data = await api.matches.getRankingsForLocation({
        locationId: location.id,
        gameTypeId: 1,
        total: 3,
        filterTypes: ['elo', 'winPercentage', 'wins'],
      });

      setRankedPlayers(data as Record<ResultFilterType, RankedPlayer[]>);

      setLoadingRankedPlayers(false);
    };

    fetchRecentGames(location);
    fetchRankings(location);
  }, [api, location]);

  return (
    <main className="flex h-screen flex-col items-center">
      <Text type="h1" className="my-5">
        {location.name}
      </Text>

      <Card className="grid h-full w-full grid-flow-col grid-rows-4 gap-4">
        <AvailableGamesOverview
          availableGames={location.availableGames}
          buildGameLink={game => buildLobbyUrl(location, game)}
          className="col-span-2 row-span-2 bg-red-100"
        />

        <TopPlayersOverview
          className="col-span-2 row-span-2 h-full w-full"
          loading={loadingRankedPlayers}
          rankedPlayers={rankedPlayers}
        />

        <RecentMatchesOverview
          className="row-span-4 h-full w-full"
          recentMatches={recentMatches}
          loading={loadingRecentMatches}
        />
      </Card>
    </main>
  );
}
