import { useEffect, useState } from "react";
import { Button, PlayerCard } from "ui";
import HeadToHeadSection from "ui/HeadToHead/HeadToHeadSection";
import getConfig from "next/config";

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

  const [apiLoading, setApiLoading] = useState(true)
  const [users, setUsers] = useState<any[]>([])

  const userIds = ['jjp', 'pjm', 'stc', 'ad2']

  const { apiBaseUrl } = getConfig().publicRuntimeConfig

  useEffect(() => {

    const fetchUsers = async () => {
      
      console.log(apiBaseUrl)

      const responses = await Promise.all(userIds
        .map(async userId => { 
          try {
            const foo = await fetch(`${apiBaseUrl}/users/${userId}`)
            console.log(foo)
            return fetch(`${apiBaseUrl}/users/${userId}`)
          } catch (error) {
            return null
          }
        })
      )

      console.log(responses)


      const users = await Promise.all(responses
        .filter(response => response && response.status === 200)
        .map(response => response!.json()))

      console.log(users)

      setUsers(users)
      setApiLoading(false)

    }

    fetchUsers()

  }, [])

  return (
    <div className="flex h-screen flex-col items-center mt-20">
      <h1 className="text-3xl font-bold underline">Competitive standing</h1>
      <div className="mt-10">
        { games.map(game => <HeadToHeadSection key={game.id} game={game} />) }
      </div>
      <div className="my-4">
        <Button text="Add match" onClick={addMatch} />
      </div>

      <div className='md:flex'>

        {!apiLoading && users.map(user => (<PlayerCard className='mx-5' key={user.memorableId} player={user} />))}
    
      </div>
    </div>
  );
}