import { GameType, Location, RankedPlayer, ResultFilterType } from 'schema';
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import {
  AvailableGamesOverview,
  Card,
  GameResult,
  RecentMatchesOverview,
  Text,
  TopPlayersOverview,
} from 'ui';
import { ApiContext, getApiInstance } from '@src/context/ApiContext';
import { useContext, useEffect, useState } from 'react';
import mapRecentResults from '@src/mappers/recentResultsMapper';
import Head from 'next/head';
import { PagePropsWithLocation } from '@src/utils/staticPropUtils';
import { buildLobbyUrl } from '@src/utils/routingUtils';
import Link from 'next/link';

type LocationPageProps = PagePropsWithLocation & {
  currentLocation: Location;
};

type LocationPageDynamicPath = { locationUrlPath: string };

export async function getStaticPaths(
  _context: GetStaticPathsContext,
): Promise<GetStaticPathsResult<LocationPageDynamicPath>> {
  const locations = await getApiInstance().location.getAllLocations();

  return {
    paths: locations.map(location => ({
      params: { locationUrlPath: location.urlPath },
    })),
    fallback: false,
  };
}

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

export async function getStaticProps({
  params,
}: GetStaticPropsContext<LocationPageDynamicPath>): Promise<
  GetStaticPropsResult<LocationPageProps>
> {
  if (!params) throw new Error();

  const locations = await getApiInstance().location.getAllLocations();

  const currentLocation = locations.find(
    location => location.urlPath === params.locationUrlPath,
  );

  if (!currentLocation) throw new Error();

  return {
    props: {
      currentLocation,
      locations,
    },
  };
}

export default function Index({ currentLocation }: LocationPageProps) {
  const api = useContext(ApiContext);

  const [loadingRecentMatches, setLoadingRecentMatches] = useState(true);
  const [recentMatches, setRecentMatches] = useState<GameResult[]>([]);

  const [loadingRankedPlayers, setLoadingRankedPlayers] = useState(true);
  const [rankedPlayers, setRankedPlayers] =
    useState<Record<ResultFilterType, RankedPlayer[]>>();

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

  useEffect(() => {
    fetchRecentGames(currentLocation);
    fetchRankings(currentLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation]);

  return (
    <main className="flex h-screen flex-col items-center">
      <Head>
        <title>{`Competitive Standing | ${currentLocation.name}`}</title>
      </Head>

      <Text type="h1" className="my-5">
        {currentLocation.name}
      </Text>

      <Link href={`${currentLocation.name.toLowerCase()}/results`}>
        Results
      </Link>

      <Card className="grid h-full w-full grid-flow-col grid-rows-4 gap-4">
        <AvailableGamesOverview
          availableGames={currentLocation.availableGames}
          buildGameLink={game => buildLobbyUrl(currentLocation, game)}
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
