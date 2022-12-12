import { getApiInstance } from '@src/context/foo';
import { PageStaticParamProps } from './types';

export default async function Head({ params }: PageStaticParamProps) {
  const location = await (
    await fetch(`http://localhost:7071/api/locations/${params.locationUrlPath}`)
  ).json();

  // const location = await getApiInstance().location.getLocationByUrl(
  //   params.locationUrlPath,
  // );

  return (
    <>
      <title>{`Competitive Standing | ${location.name}`}</title>
    </>
  );
}
