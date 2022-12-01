import { twMerge } from 'tailwind-merge';
import { WithDefaultProps } from '../../types';
import { IconBaseProps, IconType } from 'react-icons';
import React from 'react';

type IconButtonProps = WithDefaultProps<{
  icon: IconType;
  buttonSize?: 's' | 'm' | 'l';
  onClick: () => void;
  iconClassName?: string;
  disabled?: boolean;
}>;

const buttonSizes = {
  s: 20,
  m: 30,
  l: 40,
};

export default function IconButton({
  icon,
  onClick,
  buttonSize = 'm',
  className,
  iconClassName,
  disabled = false,
}: IconButtonProps) {
  const iconProps: IconBaseProps = {
    size: buttonSizes[buttonSize],
    className: twMerge('disabled:opacity-25', iconClassName),
  };

  const iconToRender = React.createElement(icon, iconProps);

  return (
    <button
      className={twMerge('rounded-full disabled:opacity-25', className)}
      onClick={onClick}
      disabled={disabled}
    >
      {iconToRender}
    </button>
  );
}
