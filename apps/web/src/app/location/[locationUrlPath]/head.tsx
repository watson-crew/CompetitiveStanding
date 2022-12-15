import { getApiInstance } from '@src/factory/apiFactory';
import { PageStaticParamProps } from './types';

export default async function Head({ params }: PageStaticParamProps) {
  const location = await getApiInstance().location.getLocationByUrl(
    params.locationUrlPath,
  );

  return (
    <>
      <title>{`Competitive Standing | ${location.name}`}</title>
    </>
  );
}
