import { twMerge } from 'tailwind-merge';
import { WithDefaultProps } from '../../types';
import Text, { TextType } from '../Text/Text';
import CountUp from 'react-countup';
import ReactTooltip from 'react-tooltip';

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
  id,
}: PlayerEloProps) {
  // Handle + / - with styling
  const absElo = Math.abs(startElo + eloChange);

  const derivedDisplayType = displayType || getDisplayType(eloChange);

  const tooltipProps: object = {
    'data-for': `${id}-tooltip`,
  };

  return (
    <span>
      <Text
        type="p"
        style={textStyle}
        className={twMerge(
          'font-extrabold',
          displayTypeStyles[derivedDisplayType],
          className,
        )}
      >
        <CountUp
          containerProps={derivedDisplayType === 'total' ? tooltipProps : {}}
          start={startElo}
          end={absElo}
          delay={1}
          duration={2}
        />
      </Text>
      <ReactTooltip id={`${id}-tooltip`} className="flex w-32 p-2 text-center">
        <Text type="p" className="whitespace-normal text-xs">
          Total Elo. <br />
          Your relative skill level, updated after each match
        </Text>
      </ReactTooltip>
    </span>
  );
}
