import { WithDefaultProps } from '../../types';
import { twMerge } from 'tailwind-merge';
import { IoMdCloseCircle } from 'react-icons/io';
import IconButton from '../IconButton/IconButton';

type CloseButtonProps = WithDefaultProps<{
  buttonSize?: 's' | 'm' | 'l';
  onClose: () => void;
}>;

type WithCloseButtonProps = CloseButtonProps & {
  children: React.ReactNode;
};

export default function WithCloseButton({
  buttonSize = 'm',
  onClose,
  children,
  className,
}: WithCloseButtonProps) {
  return (
    <section className="relative">
      <IconButton
        icon={IoMdCloseCircle}
        buttonSize={buttonSize}
        onClick={onClose}
        className={twMerge('absolute -top-3 -right-5 mr-2', className)}
        iconClassName="fill-slate-300 transition duration-300 hover:fill-slate-500"
      />
      {children}
    </section>
  );
}
