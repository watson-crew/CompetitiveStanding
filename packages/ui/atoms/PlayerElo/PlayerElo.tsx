import { twMerge } from 'tailwind-merge';
import { WithDefaultProps } from '../../types';
import Text from '../Text/Text';

export type EloDisplayType = 'total' | 'gain' | 'loss';

type PlayerEloProps = WithDefaultProps<{
  displayType: EloDisplayType;
  elo: number;
}>;

const displayTypeStyles: Record<EloDisplayType, string> = {
  gain: `text-green-600 before:content-['+'] before:mr-1`,
  loss: `text-red-500 before:content-['-'] before:mr-1`,
  total: 'text-orange-600',
};

export default function PlayerElo({
  displayType,
  elo,
  className,
}: PlayerEloProps) {
  return (
    <Text
      type="p"
      className={twMerge(
        'font-extrabold',
        displayTypeStyles[displayType],
        className,
      )}
    >
      {Math.abs(elo)}
    </Text>
  );
}
