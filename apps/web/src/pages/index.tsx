import { Location } from "schema";
import { PlayerCard, Text } from 'ui'
import { getApiInstance } from "@src/context/ApiContext";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";

import { useSelector, useDispatch } from 'react-redux'
import { addRecentlyPlayed, selectRecentlyPlayed } from '@src/store/reducers/playerSlice'
// TODO: Look at connect() - what would we use this for?

type RootPageProps = {
  locations: Location[]
}

export async function getStaticProps(_context: GetStaticPropsContext): Promise<GetStaticPropsResult<RootPageProps>> {
  return {
    props: {
      locations: await getApiInstance().location.getAllLocations()
    }
  }
}

export default function Index({ locations }: RootPageProps) {
  const recentlyPlayedUsers = useSelector(selectRecentlyPlayed)
  const dispatch = useDispatch()

  const addJoshToRecentlyPlayed = async () => {
    const josh = await getApiInstance().user.getUserByMemorableId('jjp')
    dispatch(addRecentlyPlayed(josh))
  }

  return (
    <div className="flex h-screen flex-col items-center">
      <Text type='h1' className="text-3xl font-bold underline">Competitive standing</Text>

      <h1>Locations</h1>
      {locations.map(location => <Text type='h2'>{JSON.stringify(location)}</Text>)}
      <hr />

      <h1>Recently Played</h1>
      {recentlyPlayedUsers && recentlyPlayedUsers.map(user => <PlayerCard player={user}/>)}

      <button
        onClick={addJoshToRecentlyPlayed}
      >
        Add Josh to recently played
      </button>
    </div>
  );
}
