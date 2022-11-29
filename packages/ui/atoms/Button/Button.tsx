import { WithDefaultProps } from '../../types';

type ButtonProps = WithDefaultProps<{
  text: string;
  disabled?: boolean;
  onClick: () => void;
}>;

export default function Button({
  text,
  onClick,
  disabled,
  className = '',
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`font-small relative my-5 w-24 cursor-pointer rounded bg-yellow-600 py-2 px-4 text-center text-lg text-white shadow-md hover:bg-yellow-500 disabled:opacity-25 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
