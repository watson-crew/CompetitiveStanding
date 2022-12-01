import TextWithIcon from '../TextWithIcon/TextWithIcon';
import Image from 'next/image';
import { User } from 'schema';
import { CommonIcons } from '../../types/icons';
import Card from '../../atoms/Card/Card';
import { WithDefaultProps } from '../../types';
import { twMerge } from 'tailwind-merge';
import Text from '../../atoms/Text/Text';
import { useEffect, useState } from 'react';

const defaultProfilePicturePath = '/defaultProfilePicture.jpeg';

const getFullName = (player: User) => `${player.firstName} ${player.lastName}`;

type PlayerCardProps = WithDefaultProps<{
  player: User;
  children?: React.ReactNode;
}>;

export default function PlayerCard({
  player,
  className,
  children,
}: PlayerCardProps) {
  const fullName = getFullName(player);

  useEffect(() => {
    const { profilePicture } = player;
    setImgSrc(profilePicture);
  }, [player]);

  const [imgSrc, setImgSrc] = useState<string>();

  return (
    <Card className={twMerge('flex max-h-32 max-w-sm bg-slate-200', className)}>
      <div className="relative h-24 w-24">
        <Image
          src={imgSrc || defaultProfilePicturePath}
          alt={`${fullName}'s picture`}
          onError={_e => setImgSrc(defaultProfilePicturePath)}
          fill={true}
          sizes=""
          className="rounded-full"
        />
      </div>

      <section className="pl-10 text-left">
        <Text type="h3" className="text-sky-500 dark:text-sky-400">
          {fullName}
        </Text>
        <Text type="p" className="font-bold text-[#ff3e00]">
          {player.memorableId}
        </Text>
        <TextWithIcon icon={CommonIcons.HomeLocation} textProps={{ type: 'p' }}>
          {player.location}
        </TextWithIcon>
      </section>
      {children && <section className="pl-5">{children}</section>}
    </Card>
  );
}
