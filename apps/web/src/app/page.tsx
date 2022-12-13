import { getApiInstance } from '@src/factory/apiFactory';
import { uniqueItemsToRecord } from '@src/utils/collectionUtils';
import LandingPage from './LandingPage';

export default async function Page() {
  const locations = await getApiInstance().location.getAllLocations();
  console.log(locations);
  console.log(locations);
  console.log(locations);
  console.log(locations);

  return <LandingPage locations={uniqueItemsToRecord(locations)} />;
}
