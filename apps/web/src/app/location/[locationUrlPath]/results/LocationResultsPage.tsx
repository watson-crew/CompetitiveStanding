'use client';

import RankedPlayerTableCard from '@src/components/atoms/RankedPlayerTableCard/RankedPlayerTableCard';
import RankedPlayerTable from '@src/components/molecules/Table/RankedPlayerTable';
import { useMemo } from 'react';
import { Row } from 'react-table';
import { Location, RankedPlayer } from 'schema';

type LocationResultsPageProps = {
  location: Location;
  results: RankedPlayer[];
};

export default function LocationResultsPage({
  location,
  results,
}: LocationResultsPageProps) {
  const data = useMemo(() => results, [results]);

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
      <h1 className="text-center text-xl">{location.name} Results</h1>
      <div className="mt-4">
        {data && <RankedPlayerTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
