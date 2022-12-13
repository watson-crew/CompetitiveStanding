'use client';

import { Text, Link, Card, LocationLinkCard } from 'ui';
import { Routes } from '@src/types/routes';
import { buildLocationUrl } from '@src/utils/routingUtils';
import { PagePropsWithLocation } from '@src/types/staticProps';

export default function LandingPage({ locations }: PagePropsWithLocation) {
  return (
    <main className="flex h-screen flex-col items-center px-10 xl:px-28">
      <Text type="h1" className="text-3xl font-bold underline">
        Competitive standing
      </Text>

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

      <hr />

      <Link href={Routes.Lobby}>Play game</Link>

      <Link href={Routes.SignUp}>Sign up</Link>
    </main>
  );
}
