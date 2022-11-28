import { Location } from "schema";
import { PlayerCard, Text, Link } from 'ui'
import { getApiInstance } from "@src/context/ApiContext";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";

import { useSelector, useDispatch } from 'react-redux'
import { selectRecentlyPlayed, clearRecentlyPlayed } from '@src/store/reducers/playerSlice'

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
  const dispatch = useDispatch()
  const recentlyPlayedUsers = useSelector(selectRecentlyPlayed)

  const clearRecentlyPlayedUsers = () => dispatch(clearRecentlyPlayed())

  return (
    <div className="flex h-screen flex-col items-center">
      <Text type='h1' className="text-3xl font-bold underline">Competitive standing</Text>

      <h1>Locations</h1>
      {locations.map(location => <Text type='h2'>{JSON.stringify(location)}</Text>)}
      <hr />

      <Link href="/play">
        Play game
      </Link>

      <Link href="/signup">
        Sign up
      </Link>

      <hr />

      <h1>Recently Played</h1>
      {recentlyPlayedUsers && recentlyPlayedUsers.map(user => <PlayerCard player={user}/>)}

      <button onClick={clearRecentlyPlayedUsers}>
        Clear Recently Selected
      </button>

    </div>
  );
}
