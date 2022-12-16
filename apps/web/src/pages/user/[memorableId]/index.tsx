import { GetPlayerProfileByMemorableIdData } from 'schema';
import { getApiInstance } from '@src/context/ApiContext';
import { PagePropsWithLocation } from '@src/utils/staticPropUtils';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';

type UserPageProps = PagePropsWithLocation & {
  player: GetPlayerProfileByMemorableIdData;
};

type UserPageDynamicPath = { memorableId: string };

export async function getServerSideProps({
  params,
}: GetStaticPropsContext<UserPageDynamicPath>): Promise<
  GetStaticPropsResult<UserPageProps>
> {
  if (!params) throw new Error();

  const currentUser = await getApiInstance().user.getUserByMemorableId(
    params.memorableId,
  );

  const player = await getApiInstance().player.getPlayerProfileByMemorableId(
    params.memorableId,
  );

  const locations = await getApiInstance().location.getAllLocations();

  if (!currentUser || !locations) throw new Error();

  return { props: { player, locations } };
}

export default function index({ player }: UserPageProps) {
  console.log(player);
  return <></>;
}
