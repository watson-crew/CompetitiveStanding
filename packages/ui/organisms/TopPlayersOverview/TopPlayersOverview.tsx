import { twMerge } from 'tailwind-merge';
import Card from '../../atoms/Card/Card';
import TopPlayersCard from '../../molecules/TopPlayerCard/TopPlayerCard';
import { topPlayerCardType } from '../../molecules/TopPlayerCard/TopPlayerCard';
import { CommonIcons, WithDefaultProps, WithLoadingProps } from '../../types';
import { RankedPlayer, ResultFilterType } from 'schema';
import { useEffect, useState } from 'react';
import SelectWithIcon, {
  SelectWithIconOption,
  SelectWithIconProps,
} from '../../atoms/SelectWithIcon/SelectWithIcon';
import TextWithIcon from '../../molecules/TextWithIcon/TextWithIcon';

type TopPlayersOverviewProps = WithDefaultProps<
  WithLoadingProps<{
    rankedPlayers?: Record<ResultFilterType, RankedPlayer[]>;
  }>
>;

export default function TopPlayersOverview({
  rankedPlayers,
  className,
  loading,
}: TopPlayersOverviewProps) {
  const cardsToRender: JSX.Element[] = [];

  const options: SelectWithIconOption<ResultFilterType>[] = [
    { value: 'elo', label: 'Elo', icon: CommonIcons.Elo },
    { value: 'wins', label: 'Wins', icon: CommonIcons.Win },
    {
      value: 'winPercentage',
      label: 'Win Rate',
      icon: CommonIcons.Percentage,
    },
  ];

  const [selectedPlayers, setSelectedPlayers] = useState<RankedPlayer[]>([]);

  const [filterType, setFilterType] = useState(options[0]);

  const onChange: SelectWithIconProps<ResultFilterType>['onChange'] = (
    newVal,
    { action },
  ) => {
    if (action === 'select-option' && newVal) {
      setFilterType(newVal);
    }
  };

  useEffect(() => {
    if (rankedPlayers) {
      setSelectedPlayers(rankedPlayers[filterType.value]);
    }
  }, [filterType, rankedPlayers]);

  const cardDetailsToRender = () => {
    if (!selectedPlayers) return [];
    return [
      {
        rankedPlayer: selectedPlayers[0],
        cardType: topPlayerCardType.FIRST,
        className: 'row-span-6 col-span-2',
      },
      {
        rankedPlayer: selectedPlayers[1],
        cardType: topPlayerCardType.SECOND,
        className: 'row-span-3 col-span-3',
      },
      {
        rankedPlayer: selectedPlayers[2],
        cardType: topPlayerCardType.THIRD,
        className: 'row-span-3 col-span-3',
      },
    ];
  };

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
          className={details.className}
        />,
      );
    }
  });

  return (
    <Card
      className={twMerge('flex h-full w-full flex-col pt-2', className)}
      color="blue-100"
    >
      <div className="mb-2 flex items-center justify-between">
        <TextWithIcon textProps={{ type: 'h2' }} icon={CommonIcons.Podium}>
          Who&apos;s on top
        </TextWithIcon>
        <SelectWithIcon
          className="w-36 min-w-fit"
          value={filterType}
          options={options}
          onChange={onChange}
        />
      </div>
      <section className="grid h-full w-full grid-flow-col grid-rows-6 gap-1 overflow-auto">
        {cardsToRender}
      </section>
    </Card>
  );
}
