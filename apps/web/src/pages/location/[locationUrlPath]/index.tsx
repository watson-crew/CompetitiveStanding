import { Location } from 'schema';
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import {
  AvailableGamesOverview,
  Card,
  RecentMatchesOverview,
  Text,
  TopPlayersOverview,
} from 'ui';
import { getApiInstance } from '@src/context/ApiContext';

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
  return (
    <div className="flex h-screen flex-col items-center">
      <Text type="h1" className="my-5">
        {location.name}
      </Text>

      <Card
        className="grid h-full w-full grid-flow-col grid-rows-4 gap-4"
        isFlex={false}
      >
        <AvailableGamesOverview
          availableGames={[]}
          className="col-span-2 row-span-2 bg-red-100"
        />

        <TopPlayersOverview className="col-span-2 row-span-2 h-full w-full" />

        <RecentMatchesOverview
          className="row-span-4 h-full w-full"
          isLoading={true}
        />
      </Card>
    </div>
  );
}
