import { GameResult, WithDefaultProps, WithLoadingProps } from '../../types';
import Card from '../../atoms/Card/Card';
import ResultCard from '../../molecules/ResultCard.tsx/ResultCard';
import { twMerge } from 'tailwind-merge';
import Text from '../../atoms/Text/Text';
import { useEffect, useState } from 'react';

type RecentMatchesOverviewProps = WithDefaultProps<
  WithLoadingProps<{
    recentMatches: GameResult[];
  }>
>;

export default function RecentMatchesOverview({
  className,
  loading,
  recentMatches,
}: RecentMatchesOverviewProps) {
  let cardsToRender: JSX.Element[] = [];

  const [hasRecentMatches, setHasRecentPlayers] = useState(false);

  useEffect(() => {
    setHasRecentPlayers(recentMatches.length > 0);
  }, [recentMatches]);

  if (loading) {
    const skeletonsToRender = 8;
    cardsToRender = new Array(skeletonsToRender)
      .fill(undefined)
      .map((_, i) => <ResultCard key={i} loading={true} />);
  } else {
    cardsToRender = recentMatches.map((recentMatch, i) => (
      <ResultCard key={i} loading={false} gameResult={recentMatch} />
    ));
  }

  return (
    <Card
      color="slate-200"
      className={twMerge('flex h-full w-full flex-col', className)}
    >
      <Text type="h2">Recent matches</Text>
      <div
        className={`mt-2 flex h-full w-full flex-col gap-2 overflow-scroll ${
          !hasRecentMatches ? 'items-center justify-center' : ''
        }`}
      >
        {!hasRecentMatches && <Text type="p">No recent matches</Text>}
        {hasRecentMatches && cardsToRender}
      </div>
    </Card>
  );
}
