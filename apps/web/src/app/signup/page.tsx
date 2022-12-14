import { getApiInstance } from '@src/factory/apiFactory';
import { uniqueItemsToRecord } from '@src/utils/collectionUtils';
import SignUpPage from './SignUpPage';

export default async function SignUp() {
  const locations = await getApiInstance().location.getAllLocations();

  return <SignUpPage locations={uniqueItemsToRecord(locations)} />;
}
