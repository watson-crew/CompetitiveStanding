import { useContext, useEffect, useState } from "react";
import PlayerSelection from "@organisms/PlayerSelection/PlayerSelection";
import { Location } from "schema";
import { ApiContext } from "@src/context/ApiContext";
import { useSelector, useDispatch } from 'react-redux'
import { connect } from "react-redux";
import { fetchLocations, setLocations } from '@src/stores/actions/locations'
import { useGetAllLocationsQuery } from '@src/stores/competitiveStandingApi'

export default function Index() {
  const dispatch = useDispatch()

  // TODO: Proper types
  //const locations = useSelector<any>(state => state.locations) as Location[]

  const { data: locations, error, isLoading, isFetching, isSuccess } = useGetAllLocationsQuery()
  console.log(locations);

  // const [locations, setLocations] = useState<Location[]>([])

  const client = useContext(ApiContext)

  const fetchUser = async (userId: string) => {
    return (await client.user.getUserByMemorableId(userId)).data
  }

  // useEffect(() => {
  //   console.log("Fetching locations")
  //   // fetchLocations()(dispatch); // TODO: Refactor this
  // }, [])

  // useEffect(() => {

  //     const fetchLocations = async () => {
  //       try {
  //         setLocations((await client.location.getAllLocations()).data)
  //       } catch (err) {
  //         console.error(err)
  //       }
  //     }

  //     fetchLocations()

  // }, [])

  return (
    <div className="flex h-screen flex-col items-center mt-20">
      <h1 className="text-3xl font-bold underline">Competitive standing</h1>

      {/* <PlayerSelection fetchPlayer={fetchUser}/> */}

      {locations && locations.map(location => <p>{JSON.stringify(location)}</p>)}

    </div>
  );
}


// TODO: Understand this and if we need it
//export default connect(null, { fetchLocations })(Index)