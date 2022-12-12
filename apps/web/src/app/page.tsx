// Import your Client Component
import { getApiInstance } from '@src/context/foo';
import LandingPage from './LandingPage';

export default async function Page() {
  const locations = await getApiInstance().location.getAllLocations();

  const locationRecord = Object.fromEntries(
    locations.map(location => [location.id, location]),
  );

  return <LandingPage locations={locationRecord} />;
}
