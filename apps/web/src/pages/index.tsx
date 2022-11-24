import { Location } from "schema";
import { Text } from 'ui'
import { getApiInstance } from "@src/context/ApiContext";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";

type RootPageProps = {
  locations: Location[]
}

export async function getStaticProps(_context: GetStaticPropsContext): Promise<GetStaticPropsResult<RootPageProps>> {
  
  const location = (await getApiInstance().location.getAllLocations()).data
  // Fetch necessary data for the blog post using params.id
  return {
    props: {
      locations: location
    }
  }
}
export default function Index({ locations }: RootPageProps) {


  return (
    <div className="flex h-screen flex-col items-center">
      <Text type='h1' className="text-3xl font-bold underline">Competitive standing</Text>


      {locations.map(location => <Text type='h2'>{JSON.stringify(location)}</Text>)}
    </div>
  );
}
