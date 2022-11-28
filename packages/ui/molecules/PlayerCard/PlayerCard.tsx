import TextWithIcon from '../TextWithIcon/TextWithIcon'
import Image from 'next/image'
import { User } from 'schema'
import { CommonIcons } from '../../types/icons'
import Card from '../../atoms/Card/Card'
import { WithDefaultProps } from '../../types'
import { twMerge } from 'tailwind-merge'
import Text from '../../atoms/Text/Text'

const getFullName = (player: User) => `${player.firstName} ${player.lastName}`

type PlayerCardProps = WithDefaultProps<{
  player: User
}>

export default function PlayerCard({ player, className }: PlayerCardProps) {

  const fullName = getFullName(player)
  const imageUrl = player.profilePicture ?? 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'
  
  return (
    <Card className={twMerge('bg-slate-200 flex', className)}>
      <div className="h-24 w-24 relative">
        <Image src={imageUrl} alt={`${fullName}'s picture`} fill={true} sizes="" className="rounded-full" />
      </div>
      
      <section className='pl-10'>
        <Text type='h3' className='text-sky-500 dark:text-sky-400'>{fullName}</Text>
        <Text type='p' className='text-[#ff3e00] font-bold'>{player.memorableId}</Text>
        <TextWithIcon icon={CommonIcons.HomeLocation} textProps={{ type: 'p' }}>{player.location}</TextWithIcon>
      </section>

    </Card>
  )
}
