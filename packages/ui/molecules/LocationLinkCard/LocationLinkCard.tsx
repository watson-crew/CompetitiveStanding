import { Location } from 'schema';
import Card from '../../atoms/Card/Card';
import Text from '../../atoms/Text/Text';
import { CommonIcons, WithDefaultProps } from '../../types';
import Link from '../../atoms/Link/Link';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import TextWithIcon from '../TextWithIcon/TextWithIcon';
import { getSportIcon } from '../../utils/iconUtils';

type LocationLinkCardProps = WithDefaultProps<{
  location: Location;
}>;

export default function LocationLinkCard({ location }: LocationLinkCardProps) {
  const { name, urlPath, availableGames } = location;
  const href = `/location/${urlPath}`;

  return (
    <Link
      className={twMerge(
        'min-w-content z-1 relative h-fit w-full rounded-xl bg-transparent hover:bg-transparent xl:w-5/12',
      )}
      href={href}
    >
      <Card className="w-full bg-slate-200">
        <article>
          <div className="relative h-32 w-full rounded-xl">
            <Image
              src={`/locations/${urlPath}.jpeg`}
              fill={true}
              alt={'TODO'}
              className="rounded-xl object-cover"
            />
          </div>
        </article>
        <section className="mt-5">
          <section className="flex justify-between">
            <Text type="h2" className="text-4xl">
              {name}
            </Text>
            <TextWithIcon textProps={{ type: 'p' }} icon={CommonIcons.Person}>
              {location.playerCount}
            </TextWithIcon>
          </section>
          <section className="flex flex-col gap-5 pt-5">
            {availableGames?.map(game => (
              <TextWithIcon
                key={game.id}
                icon={getSportIcon(game.id)}
                textProps={{ type: 'p' }}
              >
                {game.name}
              </TextWithIcon>
            ))}
          </section>
        </section>
      </Card>
    </Link>
  );
}
