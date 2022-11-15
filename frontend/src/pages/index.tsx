import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import PlayerCard from '../components/PlayerCard/PlayerCard'

export default function Home() {
  
  const [apiLoading, setApiLoading] = useState(true)
  const [apiResponse, setApiResponse] = useState<any>({})
  const [users, setUsers] = useState<any[]>([])

  const userIds = ['jjp', 'pjm', 'stc', 'ad2']

  useEffect(() => {

    const fetchUsers = async () => {
      
      const users = await Promise.all(userIds.map(async userId => {
        const url = `https://bjsscompetitivestandingbackend.azurewebsites.net/api/users/${userId}`
        console.log(url);
        
        const response = await fetch(url)
        return response.json()
      }))

      console.log(users)

      setUsers(users)
      setApiLoading(false)

    }

    fetchUsers()

  }, [])


  return (
    <div className={styles.container}>

      <div className='md:flex'>

        {!apiLoading && users.map(user => (<PlayerCard className='mx-5' key={user.memorableId} player={user} />))}
    
      </div>
    </div>
  )
}
