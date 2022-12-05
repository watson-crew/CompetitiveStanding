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

  // TODO: Move this to parent to handle toggle
  const [rankedPlayers, setRankedPlayers] = useState<RankedPlayer[]>(rankedPlayersByWins);

  let cardDetailsToRender: any[] = [];
  if (rankedPlayers == undefined) {
    cardDetailsToRender = [];
  } else {
    cardDetailsToRender = [
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

  cardDetailsToRender.forEach(details => {
    if (loading || !details.rankedPlayer) {
      cardsToRender.push(
        <TopPlayersCard loading={true} cardType={details.cardType} />,
      );
    } else {
      cardsToRender.push(
        <TopPlayersCard
          rankedPlayer={details.rankedPlayer}
          loading={false}
          cardType={details.cardType}
        />,
      );
    }
  });

  // Toggle functionality - TODO: maybe move to parent
  // TODO: Fix bug, it is doing it in reverse?
  const [showWinPercentage, setShowWinPercentage] = useState(false);
  const onChange = () => {
    setShowWinPercentage(!showWinPercentage);
    if (showWinPercentage) {
      console.log("Showing percentage")
     setRankedPlayers(rankedPlayersByPercentage)
    } else {
      console.log("Showing wins")
      setRankedPlayers(rankedPlayersByWins)
    }
  }

  return (
    <Card
      className={twMerge('flex h-full w-full flex-col pt-2', className)}
      color="blue-100"
    >
      <Text type="h2">Who&apos;s on top</Text>
      <Toggle
        className="flex-none"
        isToggled={showWinPercentage}
        onChange={onChange}
        defaultColor="yellow-500"
        toggledColor="cyan-800"
        beforeChild={
          <Text type="p">#</Text>
        }
        afterChild={
          <Text type="p">%</Text>
        }
      />
      <section className="grid h-full w-full grid-flow-col grid-rows-6 gap-1 overflow-auto">
        {cardsToRender}
      </section>
    </Card>
  );
}
