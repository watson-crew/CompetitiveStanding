import { twMerge } from 'tailwind-merge';
import Card from '../../atoms/Card/Card';
import Text from '../../atoms/Text/Text';
import TopPlayersCard from '../../molecules/TopPlayerCard/TopPlayerCard';
import { topPlayerCardType } from '../../molecules/TopPlayerCard/TopPlayerCard';
import { WithDefaultProps, WithLoadingProps } from '../../types';
import { RankedPlayer } from 'schema';

type TopPlayersOverviewProps = WithDefaultProps<
  WithLoadingProps<{
    rankedPlayers: RankedPlayer[];
  }>
>;

export default function TopPlayersOverview({
  rankedPlayers,
  className,
  loading,
}: TopPlayersOverviewProps) {
  // TODO: Refactor this
  const cardsToRender: JSX.Element[] = [];

  const cardDetailsToRender = [
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

  cardDetailsToRender.forEach((details, i) => {
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
      <Text type="h2">Who&apos;s on top</Text>
      <section className="grid h-full w-full grid-flow-col grid-rows-6 gap-1 overflow-auto">
        {cardsToRender}
      </section>
    </Card>
  );
}
