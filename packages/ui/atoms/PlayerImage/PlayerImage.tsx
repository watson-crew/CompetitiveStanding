import { WithDefaultProps } from '../../types';
import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type PlayerImageProps = WithDefaultProps<{
  src?: ImageProps['src'];
  playerName: string;
  variant?: ImageVariants;
}>;

const defaultProfilePicturePath = '/defaultProfilePicture.jpeg';

type ImageVariants = 's' | 'm' | 'l';
const imageSizesClasses: Record<ImageVariants, string> = {
  s: 'w-12 h-12',
  m: 'w-24 h-24',
  l: 'w-36 h-36',
};

export default function PlayerImage({
  className,
  src,
  playerName,
  variant = 'm',
}: PlayerImageProps) {
  const [imgSrc, setImgSrc] = useState<ImageProps['src']>();

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <span
      className={twMerge(`relative ${imageSizesClasses[variant]}`, className)}
    >
      <Image
        src={imgSrc || defaultProfilePicturePath}
        alt={`${playerName}'s picture`}
        onError={_e => setImgSrc(defaultProfilePicturePath)}
        fill={true}
        sizes=""
        className="rounded-full"
      />
    </span>
  );
}
