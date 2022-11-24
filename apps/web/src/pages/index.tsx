import { useEffect, useState } from "react";
import PlayerSelection from "@organisms/PlayerSelection/PlayerSelection";
import getConfig from "next/config";
import { ApiClient } from 'schema'
import { Location } from "schema";

export default function Index() {

  const [locations, setLocations] = useState<Location[]>([])

  const client = new ApiClient({ baseURL: getConfig().publicRuntimeConfig.apiBaseUrl })

  useEffect(() => {

      const fetchLocations = async () => {
        try {
          setLocations((await client.location.getAllLocations()).data)
        } catch (err) {
          console.error(err)
        }
      }

      fetchLocations()

  }, [])

  return (
    <div className="flex h-screen flex-col items-center mt-20">
      <h1 className="text-3xl font-bold underline">Competitive standing</h1>

      <PlayerSelection />

    </div>
  );
}
