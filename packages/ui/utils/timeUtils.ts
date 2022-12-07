import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);
dayjs.extend(duration);

export function formatDuration(
  startTime: Dayjs,
  endTime: Dayjs,
  format: string,
): string {
  const timeTaken = endTime.diff(startTime);
  return dayjs.duration(timeTaken, 'milliseconds').format(format);
}

export function getFormattedDatePlayed(gameEndTime: Dayjs): string {
  const now = dayjs();

  if (gameEndTime.isAfter(now.subtract(2, 'minutes'))) {
    return 'Just now';
  }

  if (gameEndTime.isAfter(now.subtract(1, 'hour'))) {
    return formatDuration(gameEndTime, now, 'm [minutes ago]');
  }

  if (gameEndTime.isAfter(now.startOf('day'))) {
    const hoursDiff = now.diff(gameEndTime, 'hours');
    return formatDuration(
      gameEndTime,
      now,
      `H [hour${hoursDiff > 1 ? 's' : ''} ago]`,
    );
  }

  if (gameEndTime.isAfter(now.subtract(7, 'days'))) {
    return gameEndTime.format('dddd');
  }

  return gameEndTime.format('Do MMM');
}
