import { GetRecentMatchesByMemorableIdData, User } from 'schema';
import { getApiInstance } from '@src/context/ApiContext';
import { PagePropsWithLocation } from '@src/utils/staticPropUtils';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { RankedPlayerTableCard } from '@src/../../../packages/ui';

type UserPageProps = PagePropsWithLocation & {
  matches: GetRecentMatchesByMemorableIdData;
  user: User;
};

type UserPageDynamicPath = { memorableId: string };

export async function getServerSideProps({
  params,
}: GetStaticPropsContext<UserPageDynamicPath>): Promise<
  GetStaticPropsResult<UserPageProps>
> {
  if (!params) throw new Error();

  const matches = await getApiInstance().player.getRecentMatchesByMemorableId(
    params.memorableId,
  );

  const user = await getApiInstance().user.getUserByMemorableId(
    params.memorableId,
  );

  const locations = await getApiInstance().location.getAllLocations();

  if (!matches || !locations) throw new Error();

  return { props: { matches, locations, user } };
}

export default function index({ matches, user }: UserPageProps) {
  console.log(matches);
  return <RankedPlayerTableCard user={user} />;
}
