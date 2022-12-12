import { getApiInstance } from '@src/context/foo';
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
  // const locations = await getApiInstance().location.getAllLocations();

  // const locationRecord = Object.fromEntries(
  //   locations.map(location => [location.id, location]),
  // );

  // const location = await getApiInstance().location.getLocationByUrl(
  //   params.locationUrlPath,
  // );

  const location = await (
    await fetch(`http://localhost:7071/api/locations/${params.locationUrlPath}`)
  ).json();

  return <LocationPage location={location} />;
}
