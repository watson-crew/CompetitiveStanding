import { Text, Card, LocationLinkCard } from 'ui';
import { getApiInstance } from '@src/context/ApiContext';
import Head from 'next/head';
import {
  getLocationStaticPropsFactory,
  PagePropsWithLocation,
} from '@src/utils/staticPropUtils';
import { buildLocationUrl } from '@src/utils/routingUtils';

export const getStaticProps = getLocationStaticPropsFactory(getApiInstance());

export default function Index({ locations }: PagePropsWithLocation) {
  return (
    <main className="flex h-screen flex-col items-center px-10 xl:px-28">
      <Head>
        <title>Competitive Standing</title>
      </Head>

      <Card id="locations" className="my-5 w-full text-center">
        <Text type="h1" className="my-5">
          Locations
        </Text>
        <section className="flex flex-wrap justify-around gap-10">
          {Object.values(locations).map(location => (
            <LocationLinkCard
              key={location.id}
              location={location}
              buildLocationUrl={buildLocationUrl}
            />
          ))}
        </section>
      </Card>
    </main>
  );
}
