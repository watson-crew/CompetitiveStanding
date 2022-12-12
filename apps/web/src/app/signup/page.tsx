// Import your Client Component
import { getApiInstance } from '@src/context/foo';
import SignUpPage from './SignUpPage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page() {
  const locations = await getApiInstance().location.getAllLocations();

  const locationRecord = Object.fromEntries(
    locations.map(location => [location.id, location]),
  );

  return <SignUpPage locations={locationRecord} />;
}
