import { useEffect, useReducer, useState } from "react";
import { PlayerSelection } from "ui";
import getConfig from "next/config";
import { AppClient, User } from 'schema'
import { Location } from "schema";

export default function Index() {

  const games = [
    {
      id: 0,
      player: {
        id: 0,
        name: "Pierce",
        score: 0
      },
      opponent: {
        id: 1,
        name: "Josh",
        score: 0
      }
    },
    {
      id: 1,
      player: {
        id: 2,
        name: "Stephen",
        score: 0
      },
      opponent: {
        id: 3,
        name: "Fabs",
        score: 0
      }
    }
  ]

  const addMatch = () => {
    // function to add match + players (if they dont exist)
  }

  const [users, addUser] = useReducer((users: User[], newUser: User) => [...users, newUser], [] as User[])
  const [locations, setLocations] = useState<Location[]>([])

  const userIds = ['jjp', 'pjm', 'stc', 'ad2', '4e8']

  const client = new AppClient({BASE: getConfig().publicRuntimeConfig.apiBaseUrl }) 

  const fetchUser = (userId: string) => client.user.getUserByMemorableId(userId)

  useEffect(() => {

      userIds.forEach(async userId => {
        try {
          addUser(await client.user.getUserByMemorableId(userId))
        } catch (err) {
          console.error(err);
        }
      })

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
