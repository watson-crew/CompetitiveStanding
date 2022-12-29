import { getApiInstance } from '@src/factory/apiFactory';
import LocationResultsPage from './LocationResultsPage';
import { PageStaticParamProps } from '../types';
import { notFound } from 'next/navigation';
import { Location, RankedPlayer } from 'schema';

async function fetchLocation(
  locationUrlPath: string,
): Promise<Location | null> {
  try {
    return getApiInstance().location.getLocationByUrl(locationUrlPath);
  } catch (err) {
    return null;
  }
}

async function fetchResults(id: number): Promise<RankedPlayer[]> {
  try {
    const result = await getApiInstance().matches.getRankingsForLocation({
      locationId: id,
      gameTypeId: 1,
      total: 100,
      filterTypes: ['elo'],
    });
    return result.elo;
  } catch (err) {
    return [];
  }
}

export default async function ServerLocationResultsPage({
  params,
}: PageStaticParamProps) {
  const location = await fetchLocation(params.locationUrlPath);

  if (!location) {
    notFound();
  }

  const results = await fetchResults(location.id);

  return <LocationResultsPage location={location} results={results} />;
}
