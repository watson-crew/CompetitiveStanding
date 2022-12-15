import { RankedPlayerTableCard } from '@src/../../../packages/ui';
import RankedPlayerTable from '@src/components/molecules/Table/RankedPlayerTable';
import { ApiContext, getApiInstance } from '@src/context/ApiContext';
import { PagePropsWithLocation } from '@src/utils/staticPropUtils';
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Row } from 'react-table';
import { Location, RankedPlayer } from 'schema';

type LocationPageDynamicPath = { locationUrlPath: string };
type LocationPageProps = PagePropsWithLocation & {
  currentLocation: Location;
};

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

export default function Results({ currentLocation }: LocationPageProps) {
  const api = useContext(ApiContext);

  const [rankedPlayers, setRankedPlayers] = useState<RankedPlayer[]>();

  const fetchRankings = async (location: Location) => {
    const data = (
      await api.matches.getRankingsForLocation({
        locationId: location.id,
        gameTypeId: 1,
        total: 100,
        filterTypes: ['elo'],
      })
    ).elo;

    setRankedPlayers(data as RankedPlayer[]);
  };

  useEffect(() => {
    fetchRankings(currentLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation]);

  const data = useMemo(() => rankedPlayers, [rankedPlayers]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: any = useMemo(
    () => [
      {
        Header: '#',
        disableSortBy: true,
        Cell: ({ row }: { row: Row<object> }) => <>{Number(row.id) + 1}</>,
      },
      {
        Header: 'Rating',
        accessor: 'elo',
      },
      {
        Header: 'Player',
        accessor: 'player.firstName',
        disableSortBy: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: { row: any }) => (
          <RankedPlayerTableCard user={row.original.player} />
        ),
      },
      {
        Header: 'Games Played',
        accessor: 'gamesPlayed',
      },
      {
        Header: 'Wins',
        accessor: 'wins',
      },
      {
        Header: 'Win Percentage',
        accessor: 'winPercentage',
        Cell: ({ value }: { value: string }) => `${value}%`,
      },
    ],
    [],
  );

  return (
    <div className="container mx-auto px-4 ">
      <h1 className="text-center text-xl">{currentLocation.name} Results</h1>
      <div className="mt-4">
        {data && <RankedPlayerTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
