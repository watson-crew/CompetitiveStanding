import { getApiInstance } from '@src/factory/apiFactory';
import { PageServerParamProps } from './types';

export default async function Head({ params }: PageServerParamProps) {
  const user = await getApiInstance().user.getUserByMemorableId(
    params.memorableId,
  );

  return (
    <>
      <title>{`${user.firstName}'s profile`}</title>
    </>
  );
}
