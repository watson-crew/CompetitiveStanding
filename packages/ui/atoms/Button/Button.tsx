import { twMerge } from 'tailwind-merge';
import { WithDefaultProps } from '../../types';
import Text from '../Text/Text';

type ButtonProps = WithDefaultProps<{
  text?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'submit' | 'button';
}>;

export default function Button({
  children,
  text,
  onClick,
  disabled,
  className = '',
  type = 'button',
}: ButtonProps) {
  const hasChildren = children !== undefined;

  return (
    <button
      type={type}
      disabled={disabled}
      className={twMerge(
        `font-small disabled: relative my-5 w-fit cursor-pointer rounded bg-yellow-600 py-2 px-4 text-center text-lg text-white shadow-md enabled:hover:bg-yellow-500 disabled:cursor-default disabled:opacity-25`,
        className,
      )}
      onClick={onClick}
    >
      {hasChildren && children}
      {!hasChildren && <Text type="p">{text}</Text>}
    </button>
  );
}
