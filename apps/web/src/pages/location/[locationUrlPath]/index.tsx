import { Location, RankedPlayer } from 'schema';
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
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

type LocationPageProps = {
  location: Location;
};

type LocationPageDynamicPath = { locationUrlPath: string }

export async function getStaticPaths(_context: GetStaticPathsContext): Promise<GetStaticPathsResult<LocationPageDynamicPath>> {
    const locations = await getApiInstance().location.getAllLocations()

    return {
      paths: locations.map(location => ({ params: { locationUrlPath: location.urlPath } })),
      fallback: false
    }
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<LocationPageDynamicPath>): Promise<
  GetStaticPropsResult<LocationPageProps>
> {
  if (!params) throw new Error()

  return {
    props: {
      location: await getApiInstance().location.getLocationByUrl(params.locationUrlPath),
    },
  };
}

export default function Index({ location }: LocationPageProps) {


  const api = useContext(ApiContext)

  const [ loadingRecentMatches, setLoadingRecentMatches ] = useState(true)
  const [ recentMatches, setRecentMatches ] = useState<GameResult[]>([])

  const [ loadingRankedPlayers, setLoadingRankedPlayers ] = useState(true)
  const [ rankedPlayers, setRankedPlayers ] = useState<RankedPlayer[]>([])

  const fetchRecentGames = async () => {
    const data = await api.matches.getRecentMatches({ locationId: location.id })

    setRecentMatches(mapRecentResults(data))

    // TODO: Change is loading
    setLoadingRecentMatches(false)
  }

  const fetchRankings = async () => {
    // TODO: Look at where game type comes from?
    const data = await api.matches.getRankingsForLocation({ locationId: location.id, gameTypeId: 1, total: 3});

    setRankedPlayers(data)

    setLoadingRankedPlayers(false)
  }

  useEffect(() => {

    fetchRecentGames()
    fetchRankings()

  }, [])


  return (
    <div className="flex h-screen flex-col items-center">
      <Text type="h1" className="my-5">
        {location.name}
      </Text>

      <Card
        className="grid h-full w-full grid-flow-col grid-rows-4 gap-4"
      >
        <AvailableGamesOverview
          availableGames={[]}
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
    </div>
  );
}
