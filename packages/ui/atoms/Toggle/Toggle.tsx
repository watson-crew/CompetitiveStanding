import { MouseEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';
import { WithDefaultProps } from '../../types';
import Text from '../Text/Text';

type ToggleProps = WithDefaultProps<{
  defaultColor?: string;
  toggledColor?: string;
  isToggled: boolean;
  onChange: MouseEventHandler<HTMLDivElement>;
  beforeText?: string;
  afterText?: string;
  beforeChild?: React.ReactNode;
  afterChild?: React.ReactNode;
}>;

export default function Toggle({
  isToggled,
  className,
  onChange,
  beforeText,
  beforeChild,
  afterChild,
  afterText,
}: ToggleProps) {
  const beforeElement = beforeChild ? (
    beforeChild
  ) : beforeText ? (
    <Text type="p">{beforeText}</Text>
  ) : undefined;
  const afterElement = afterChild ? (
    afterChild
  ) : afterText ? (
    <Text type="p">{afterText}</Text>
  ) : undefined;

  const afterStyles = `after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']`;
  const peerStyles = `peer peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-300`;

  return (
    <span className={twMerge('inline-flex', className)}>
      {beforeElement}

      <label className="relative mx-1 inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={isToggled}
          readOnly
        />
        <div
          onClick={onChange}
          className={twMerge(
            afterStyles,
            peerStyles,
            `h-6 w-11 rounded-full bg-gray-200`,
          )}
        ></div>
      </label>
      {afterElement}
    </span>
  );
}
