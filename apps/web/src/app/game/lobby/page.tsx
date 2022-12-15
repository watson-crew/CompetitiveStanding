import { getApiInstance } from '@src/factory/apiFactory';
import { uniqueItemsToRecord } from '@src/utils/collectionUtils';
import LobbyPage from './LobbyPage';

export default async function ServerLobbyPage() {
  const locations = await getApiInstance().location.getAllLocations();

  return <LobbyPage locations={uniqueItemsToRecord(locations)} />;
}
