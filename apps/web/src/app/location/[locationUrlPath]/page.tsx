import { getApiInstance } from '@src/factory/apiFactory';
import LocationPage from './LocationPage';
import { LocationPageStaticParam, PageStaticParamProps } from './types';
import { notFound } from 'next/navigation';
import { Location } from '@src/../../../packages/schema';
export async function generateStaticParams(): Promise<
  LocationPageStaticParam[]
> {
  const locations = await getApiInstance().location.getAllLocations();

  return locations.map(location => ({
    locationUrlPath: location.urlPath,
  }));
}

export default async function Location({
  params,
}: PageStaticParamProps) {
  let location: Location | undefined;

  try {
    location = await getApiInstance().location.getLocationByUrl(
      params.locationUrlPath,
    );
  } catch (err) {
    location = undefined;
  }

  if (!location) {
    notFound();
  }

  return <LocationPage location={location} />;
}
