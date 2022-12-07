import { twMerge } from 'tailwind-merge';
import Card from '../../atoms/Card/Card';
import Text from '../../atoms/Text/Text';
import TopPlayersCard from '../../molecules/TopPlayerCard/TopPlayerCard';
import { topPlayerCardType } from '../../molecules/TopPlayerCard/TopPlayerCard';
import { WithDefaultProps, WithLoadingProps } from '../../types';
import { RankedPlayer } from 'schema';
import { useEffect, useState } from 'react';
import Toggle from '../../atoms/Toggle/Toggle';

type TopPlayersOverviewProps = WithDefaultProps<
  WithLoadingProps<{
    rankedPlayersByWins: RankedPlayer[];
    rankedPlayersByPercentage: RankedPlayer[];
  }>
>;

export default function TopPlayersOverview({
  rankedPlayersByWins,
  rankedPlayersByPercentage,
  className,
  loading,
}: TopPlayersOverviewProps) {
  // TODO: Refactor this
  const cardsToRender: JSX.Element[] = [];

  const [rankedPlayers, setRankedPlayers] = useState<RankedPlayer[]>([]);
  const [showWinPercentage, setShowWinPercentage] = useState(false);

  const onChange = () => {
    setShowWinPercentage(prev => !prev);
  }

  useEffect(() => {
    if (showWinPercentage) {
     setRankedPlayers(rankedPlayersByPercentage)
    } else {
      setRankedPlayers(rankedPlayersByWins)
    }
  })

  const cardDetailsToRender = () => {
    if (!rankedPlayers) return [];
    return [
      {
        rankedPlayer: rankedPlayers[0],
        cardType: topPlayerCardType.FIRST,
      },
      {
        rankedPlayer: rankedPlayers[1],
        cardType: topPlayerCardType.SECOND,
      },
      {
        rankedPlayer: rankedPlayers[2],
        cardType: topPlayerCardType.THIRD,
      },
    ];
  }
  
  cardDetailsToRender().forEach((details, i) => {
    if (loading || !details.rankedPlayer) {
      cardsToRender.push(
        <TopPlayersCard key={i} loading={true} cardType={details.cardType} />,
      );
    } else {
      cardsToRender.push(
        <TopPlayersCard
          key={i}
          rankedPlayer={details.rankedPlayer}
          loading={false}
          cardType={details.cardType}
        />,
      );
    }
  });

  return (
    <Card
      className={twMerge('flex h-full w-full flex-col pt-2', className)}
      color="blue-100"
    >
      <div className="flex items-center justify-between">
        <Text type="h2">Who&apos;s on top</Text>
        <Toggle
          className=""
          isToggled={showWinPercentage}
          onChange={onChange}
          defaultColor="yellow-500"
          toggledColor="cyan-800"
          beforeChild={
            <Text type="p">By Wins</Text>
          }
          afterChild={
            <Text type="p">By Percentage</Text>
          }
        />
      </div>
      <section className="grid h-full w-full grid-flow-col grid-rows-6 gap-1 overflow-auto">
        {cardsToRender}
      </section>
    </Card>
  );
}
