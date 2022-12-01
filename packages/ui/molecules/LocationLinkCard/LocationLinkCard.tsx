import { Location } from 'schema';
import Card from '../../atoms/Card/Card';
import Text from '../../atoms/Text/Text';
import { CommonIcons, SportIcons, WithDefaultProps } from '../../types';
import Link from '../../atoms/Link/Link';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import TextWithIcon from '../TextWithIcon/TextWithIcon';
import { IconType } from 'react-icons';

type LocationLinkCardProps = WithDefaultProps<{
  location: Location;
}>;

export default function LocationLinkCard({ location }: LocationLinkCardProps) {
  const { name, urlPath, availableGames } = location;

  const href = `/location/${urlPath}`;

  const getSportIcon = (iconId: number): IconType => {
    const iconMappings: Record<number, IconType> = {
      1: SportIcons.Pool,
      2: SportIcons.Pool,
      3: SportIcons.Pool,
    };

    return iconMappings[iconId] || SportIcons.Pool;
  };

  return (
    <Link
      className={twMerge(
        'min-w-content z-1 relative h-fit rounded-xl bg-transparent hover:bg-transparent ',
      )}
      href={href}
    >
      <Card className="w-96 bg-slate-200 xl:w-5/12">
        <article>
          <div className="relative h-32 w-96 rounded-xl xl:w-5/12">
            <Image
              src={`/${urlPath}.jpeg`}
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
              4
            </TextWithIcon>
          </section>
          <section className="flex">
            {availableGames?.map(game => (
              <TextWithIcon
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
