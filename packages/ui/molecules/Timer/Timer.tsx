import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { CommonIcons, WithDefaultProps } from '../../types';
import TextWithIcon from '../TextWithIcon/TextWithIcon';

type TimerProps = WithDefaultProps<{
  isCounting: boolean;
  startTime: Dayjs;
}>;

export default function Timer({
  className,
  isCounting,
  startTime,
}: TimerProps) {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  useEffect(() => {
    if (isCounting) {
      const interval = setInterval(
        () => setTimeElapsed(dayjs().diff(startTime)),
        1000,
      );

      return () => {
        clearInterval(interval);
      };
    }
  }, [startTime, isCounting]);

  const duration = dayjs
    .duration(timeElapsed, 'milliseconds')
    .format('m[m] ss[s]');

  return (
    <TextWithIcon
      textProps={{ type: 'p' }}
      icon={CommonIcons.Clock}
      className={className}
    >
      {duration}
    </TextWithIcon>
  );
}
