import { useEffect, useReducer, useState } from "react";
import { PlayerSelection } from "ui";
import getConfig from "next/config";
import { AppClient, User } from 'schema'
import { Location } from "schema";

export default function Index() {

  const [locations, setLocations] = useState<Location[]>([])

  const client = new AppClient({BASE: getConfig().publicRuntimeConfig.apiBaseUrl }) 

  const fetchUser = (userId: string) => client.user.getUserByMemorableId({ memorableId: userId })

  useEffect(() => {

      const fetchLocations = async () => {
        try {
          setLocations(await client.location.getAllLocations())
        } catch (err) {
          console.error(err)
        }
      }

      fetchLocations()

  }, [])

  return (
    <div className="flex h-screen flex-col items-center mt-20">
      <h1 className="text-3xl font-bold underline">Competitive standing</h1>

      <PlayerSelection fetchPlayer={fetchUser} />

    </div>
  );
}
