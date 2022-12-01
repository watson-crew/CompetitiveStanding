import Card, { CardProps } from '../Card/Card';
import { MdError, MdInfo, MdCheckCircle } from 'react-icons/md';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';
import React from 'react';
import { IconType } from 'react-icons';

type BannerType = 'info' | 'error' | 'success';

export type BannerCardProps = CardProps & {
  type: BannerType;
  onClose?: () => void;
};

const styles: Record<BannerType, string> = {
  success: 'bg-green-100 fill-green-600 text-green-700 border-green-600',
  error: 'bg-red-100 fill-red-600 text-red-600 border-red-600',
  info: 'bg-blue-100 fill-blue-900 text-blue-900 border-blue-900',
};

export default function Banner({
  type,
  className = '',
  onClose,
  children,
}: BannerCardProps) {
  const iconVariants: Record<BannerType, IconType> = {
    success: MdCheckCircle,
    info: MdInfo,
    error: MdError,
  };

  const icon = React.createElement(iconVariants[type], { size: 20 });

  return (
    <Card
      className={twMerge(
        'text-m flex max-w-3xl items-center border border-solid p-5 font-semibold',
        styles[type],
        className,
      )}
    >
      {icon}
      <div className="mx-3 flex-1">{children}</div>
      {onClose && (
        <button className="hover:fill-red-800" onClick={onClose}>
          <IoMdCloseCircleOutline size={20} />
        </button>
      )}
    </Card>
  );
}
