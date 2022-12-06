import { twMerge } from 'tailwind-merge';
import { WithDefaultProps } from '../../types';
import Text, { TextType } from '../Text/Text';
import CountUp from 'react-countup';

export type EloDisplayType = 'total' | 'gain' | 'loss';

type PlayerEloProps = WithDefaultProps<{
  startElo?: number;
  eloChange?: number;
  animateDelay?: number;
  textStyle?: TextType;
  displayType?: EloDisplayType;
}>;

const displayTypeStyles: Record<EloDisplayType, string> = {
  gain: `text-green-600 before:content-['+'] before:mr-1`,
  loss: `text-red-500 before:content-['-'] before:mr-1`,
  total: 'text-orange-600',
};

const getDisplayType = (change: number): EloDisplayType => {
  if (change === 0) {
    return 'total';
  }

  return change > 0 ? 'gain' : 'loss';
};

export default function PlayerElo({
  className,
  startElo = 0,
  displayType,
  eloChange = 0,
  textStyle = 'p',
}: PlayerEloProps) {
  // Handle + / - with styling
  const absElo = Math.abs(startElo + eloChange);

  const derivedDisplayType = displayType || getDisplayType(eloChange);

  return (
    <Text
      type="p"
      style={textStyle}
      className={twMerge(
        'font-extrabold',
        displayTypeStyles[derivedDisplayType],
        className,
      )}
    >
      <CountUp start={startElo} end={absElo} delay={1} duration={2} />
    </Text>
  );
}
