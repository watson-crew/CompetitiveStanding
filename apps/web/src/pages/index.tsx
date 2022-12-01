import { Location } from 'schema';
import { Text, Link } from 'ui';
import { getApiInstance } from '@src/context/ApiContext';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Head from 'next/head';

type RootPageProps = {
  locations: Location[];
};

export async function getStaticProps(
  _context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<RootPageProps>> {
  return {
    props: {
      locations: await getApiInstance().location.getAllLocations(),
    },
  };
}

export default function Index({ locations }: RootPageProps) {
  return (
    <main className="flex h-screen flex-col items-center">
      <Head>
        <title>Competitive Standing</title>
      </Head>

      <Text type="h1" className="text-3xl font-bold underline">
        Competitive standing
      </Text>

      <h1>Locations</h1>
      {locations.map(location => (
        <Text type="h2">{JSON.stringify(location)}</Text>
      ))}
      <hr />

      <Link href="/play">Play game</Link>

      <Link href="/signup">Sign up</Link>
    </main>
  );
}
