import { ApiClient, Location } from 'schema';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';

export type PagePropsWithLocation = {
  locations: Record<number, Location>;
};

export function getLocationStaticPropsFactory(
  api: ApiClient<unknown>,
): (
  context: GetStaticPropsContext,
) => Promise<GetStaticPropsResult<PagePropsWithLocation>> {
  return async _context => {
    const locations = await api.location.getAllLocations();

    return {
      props: {
        locations: Object.fromEntries(
          locations.map(location => [location.id, location]),
        ),
      },
    };
  };
}
