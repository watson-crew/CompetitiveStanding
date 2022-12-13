import { Link, getSportIcon } from 'ui';
import { buildLocationUrl } from '@src/utils/routingUtils';
import React from 'react';
import { Location } from 'schema';

export default function NavBarLocationDropdownContent(locations: Location[]) {
  return (
    <div className="mx-auto grid max-w-screen-xl  px-4 py-5  text-gray-900 md:px-6">
      <ul className="grid grid-cols-2 gap-4">
        {locations &&
          Object.values(locations).map(location => (
            <li key={`nav-bar-location-${location.id}`}>
              <Link
                href={buildLocationUrl(location)}
                className="block rounded-lg p-3 hover:bg-gray-100 "
              >
                <div className="font-semibold">{location.name}</div>
                {location.availableGames.map(game => (
                  <span
                    key={`nav-bar-location-${location.id}-game${game.id}`}
                    className="mr-2 inline-flex w-fit	text-gray-500"
                  >
                    {React.createElement(getSportIcon(game.id), {
                      size: '25px',
                    })}
                  </span>
                ))}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
