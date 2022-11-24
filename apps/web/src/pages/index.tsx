import { useContext, useEffect, useState } from "react";
import PlayerSelection from "@organisms/PlayerSelection/PlayerSelection";
import { Location } from "schema";
import { Text } from 'ui'
import { ApiContext } from "@src/context/ApiContext";

export default function Index() {

  const [locations, setLocations] = useState<Location[]>([])

  const client = useContext(ApiContext)

  const fetchUser = async (userId: string) => (await client.user.getUserByMemorableId(userId)).data

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
    <div className="flex h-screen flex-col items-center">
      <Text type='h1' className="text-3xl font-bold underline">Competitive standing</Text>

    </div>
  );
}
