import { getApiInstance } from '@src/factory/apiFactory';
import { uniqueItemsToRecord } from '@src/utils/collectionUtils';
import SignUpPage from './SignUpPage';

export default async function Page() {
  const locations = await getApiInstance().location.getAllLocations();

  return <SignUpPage locations={uniqueItemsToRecord(locations)} />;
}
