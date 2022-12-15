import { getApiInstance } from '@src/factory/apiFactory';
import PlayPage from './PlayPage';

export default async function ServerPlayPage() {
  const locations = await getApiInstance().location.getAllLocations();

  const locationRecord = Object.fromEntries(
    locations.map(location => [location.id, location]),
  );

  return <PlayPage locations={locationRecord} />;
}
