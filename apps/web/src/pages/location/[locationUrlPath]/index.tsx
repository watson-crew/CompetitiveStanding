import { Location } from "schema";
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { AvailableGamesOverview, Card, RecentMatchesOverview, Text, TopPlayersOverview } from 'ui'
import { getApiInstance } from "@src/context/ApiContext";

type StaticGenerationParams = {
  locationUrlPath: string
}

export async function getStaticPaths(_context: GetStaticPathsContext): Promise<GetStaticPathsResult<StaticGenerationParams>> {
  try {
    const { data } = await getApiInstance().location.getAllLocations()

    const paths = data.map(location => ({ params: { locationUrlPath: location.urlPath }}))

    return {
      paths,
      fallback: false
    }
  
  } catch(err) {
    return {
      paths: [],
      fallback: true
    }
  }

}

type LocationPageProps = {
  location: Location
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ locationUrlPath: string }>): Promise<GetStaticPropsResult<LocationPageProps>> {
  
  const location = (await getApiInstance().location.getLocationByUrl(params!.locationUrlPath)).data
  // Fetch necessary data for the blog post using params.id
  return {
    props: {
      location: location
    }
  }
}


export default function Index({ location }: LocationPageProps) {

  return (
    <div className="flex h-screen flex-col items-center">
      <Text type='h1' className="my-5">{location.name}</Text>

      <Card className="w-full h-full grid grid-rows-4 grid-flow-col gap-4" isFlex={false}>

          <AvailableGamesOverview availableGames={[]} className="row-span-2 col-span-2 bg-red-100" />

          <TopPlayersOverview className="row-span-2 col-span-2 w-full h-full" />
          
          <RecentMatchesOverview className="row-span-4 w-full h-full" isLoading={true} />
      </Card>
    </div>
  );
}
