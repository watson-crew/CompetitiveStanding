import Text, { TextProps } from '../../atoms/Text/Text';
import React from 'react';
import { IconBaseProps, IconType } from 'react-icons';
import { WithDefaultProps } from '../../types';
import { twMerge } from 'tailwind-merge';

type IconSize = 's' | 'm' | 'l' | 'xl';

type TextWithIconProps = WithDefaultProps<{
  icon: IconType;
  iconSize?: IconSize;
  textProps: TextProps;
  iconProps?: React.Attributes & IconBaseProps;
  reversed?: boolean;
}>;

const iconSizes: Record<IconSize, number> = {
  s: 20,
  m: 24,
  l: 30,
  xl: 50,
};

export default function TextWithIcon({
  className,
  iconSize = 'm',
  icon,
  textProps,
  children,
  reversed = false,
}: TextWithIconProps) {
  const iconProps: IconBaseProps = {
    size: iconSizes[iconSize],
    className: reversed ? 'ml-2' : 'mr-2',
  };

  const iconToRender = React.createElement(icon, iconProps);

  return (
    <span
      className={twMerge(
        'flex items-center',
        reversed ? 'flex-row-reverse' : 'flex-row',
        className,
      )}
    >
      {iconToRender}
      <Text {...textProps}>{children}</Text>
    </span>
  );
}
