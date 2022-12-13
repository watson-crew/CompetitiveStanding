import { getApiInstance } from '@src/factory/apiFactory';
import { uniqueItemsToRecord } from '@src/utils/collectionUtils';
import LocationPage from './LocationPage';
import { LocationPageStaticParam, PageStaticParamProps } from './types';

export async function generateStaticParams(): Promise<
  LocationPageStaticParam[]
> {
  const locations = await getApiInstance().location.getAllLocations();

  return locations.map(location => ({
    locationUrlPath: location.urlPath,
  }));
}

export default async function Page({ params }: PageStaticParamProps) {
  const location = await getApiInstance().location.getLocationByUrl(
    params.locationUrlPath,
  );
  const locations = await getApiInstance().location.getAllLocations();

  return (
    <LocationPage
      location={location}
      locations={uniqueItemsToRecord(locations)}
    />
  );
}
