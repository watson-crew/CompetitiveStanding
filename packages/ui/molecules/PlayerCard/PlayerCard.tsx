import Image from 'next/image'
import { User } from 'schema'
import Card from '../../atoms/Card/Card'
import { WithDefaultProps } from '../../types'

const getFullName = (player: any) => `${player.firstName} ${player.lastName}`

type PlayerCardProps = WithDefaultProps<{
  player: User
}>

export default function PlayerCard({ player, className }: PlayerCardProps) {

  const fullName = getFullName(player)
  const imageUrl = player.profilePicture ?? 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'
  
  return (
    <Card className={className}>
      <div className="h-24 w-24 relative">
        <Image src={imageUrl} alt={`${fullName}'s picture`} fill={true} sizes="" className="rounded-full" />
      </div>
      
      <section className='pl-10'>
        <p className='text-sky-500 dark:text-sky-400'>{fullName}</p>
        <p><em>{player.memorableId}</em></p>
        <p>{player.location}</p>
      </section>

    </Card>
  )
}
