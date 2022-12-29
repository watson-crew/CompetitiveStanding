import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import {
  Card,
  GameResult,
  ResultCard,
  WithDefaultProps,
  WithLoadingProps,
  Text,
} from 'ui';

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
        className={`mt-2	 flex h-full w-full flex-col gap-2 overflow-y-auto ${
          !hasRecentMatches ? 'items-center justify-center' : ''
        }`}
      >
        {!loading && !hasRecentMatches && (
          <Text type="p">No recent matches</Text>
        )}
        {(loading || hasRecentMatches) && cardsToRender}
      </div>
    </Card>
  );
}
