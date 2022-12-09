import ClipLoader from 'react-spinners/ClipLoader';
import { LoaderSizeProps } from 'react-spinners/helpers/props';
import { WithDefaultProps } from '../../types';

type LoadingSpinnerProps = WithDefaultProps<{
  size?: 'xs' | 'm';
}>;

export default function LoadingSpinner({ size = 'm' }: LoadingSpinnerProps) {
  const propsForSize: Record<'xs' | 'm', LoaderSizeProps> = {
    xs: {
      size: 20,
      cssOverride: { borderWidth: '2px' },
    },
    m: {
      size: 75,
      cssOverride: { borderWidth: '5px' },
    },
  };

  return (
    <ClipLoader
      {...propsForSize[size]}
      color="#ff3e00"
      speedMultiplier={0.75}
    />
  );
}
