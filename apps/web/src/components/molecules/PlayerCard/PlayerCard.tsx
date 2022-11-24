import Image from 'next/image'
import { User } from 'schema'
import { twMerge } from 'tailwind-merge'
import { WithCloseButton, Text, CommonIcons, Card, WithDefaultProps, TextWithIcon, LoadingSpinner } from 'ui'

import useSWR from 'swr'
import { ApiContext } from '@src/context/ApiContext';
import { useContext } from 'react'

const getFullName = (player: any) => `${player.firstName} ${player.lastName}`

type PlayerCardProps = WithDefaultProps<{
  playerId: string,
  onClose: () => any,
}>

export default function PlayerCard({ playerId, onClose }: PlayerCardProps) {
  const apiClient = useContext(ApiContext)!;

  const fetchUser = async (userId: string): Promise<User> => {
    const response = await apiClient.user.getUserByMemorableId(userId)
    return response.data
  }

  // Make sure this key does not clash
  const { data: player, error, isValidating } = useSWR(
    `${playerId}`,
    fetchUser,
    {
      dedupingInterval: 10000 // 10 seconds.
    }
  )

  const className = "" // TODO: Fill this in with something from parent component
  const containerClasses = twMerge("bg-slate-100 w-full min-h-full h-full flex justify-center items-center flex-col", className)

  if (error) {
    return (
      <WithCloseButton onClose={onClose}>
        <p>ERROR...</p>
        <p>{error.message}</p>
      </WithCloseButton>
    )
  }

  if (isValidating) {
    return (
      <Card className={containerClasses}>
        <LoadingSpinner />
      </Card>
    )
  }

  const imageUrl = player!.profilePicture ?? 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'
  const fullName = getFullName(player)

  return (
    <WithCloseButton onClose={onClose}>
      <Card className={twMerge('bg-slate-200', className)}>
        <div className="h-24 w-24 relative">
          <Image src={imageUrl} alt={`${fullName}'s picture`} fill={true} sizes="" className="rounded-full" />
        </div>

        <section className='pl-10'>
          <Text type='h3' className='text-sky-500 dark:text-sky-400'>{fullName}</Text>
          <Text type='p' className='text-[#ff3e00] font-bold'>{player!.memorableId}</Text>
          <TextWithIcon icon={CommonIcons.HomeLocation} textProps={{ type: 'p' }}>{player!.location}</TextWithIcon>
        </section>
      </Card>
    </WithCloseButton>
  )
}
