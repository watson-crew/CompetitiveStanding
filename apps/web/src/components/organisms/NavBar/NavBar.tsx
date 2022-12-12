import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import { getSportIcon } from 'ui/utils/iconUtils';
import React from 'react';
import { Routes } from '@src/types/routes';
import { buildLocationUrl } from '@src/utils/routingUtils';
import { useRouter } from 'next/router';
import { PagePropsWithLocation } from '@src/utils/staticPropUtils';

export default function NavBar({ locations }: PagePropsWithLocation) {
  const [showCities, setShowCities] = useState(false);

  const onClick = () => setShowCities(!showCities);
  const router = useRouter();

  useEffect(() => {
    setShowCities(false);
  }, [router.asPath]);

  return (
    <nav className="border-gray-200 bg-white ">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-2.5 md:px-6">
        <Link href="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-xl font-semibold">
            Competitive standing
          </span>
        </Link>
        <div
          id="mega-menu-full"
          className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4  md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium">
            <li>
              <Link
                href={Routes.Home}
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100  md:p-0 md:hover:bg-transparent md:hover:text-blue-700 "
              >
                Home
              </Link>
            </li>
            <li>
              <button
                id="mega-menu-full-dropdown-button"
                className="flex w-full items-center justify-between rounded py-2 pl-3 pr-4 font-medium text-gray-700 hover:bg-gray-100  md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-600"
                onClick={onClick}
              >
                Location{' '}
                {showCities ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
              </button>
            </li>
            <li>
              <Link
                href={Routes.CurrentMatch}
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100  md:p-0 md:hover:bg-transparent md:hover:text-blue-700 "
              >
                Play Game
              </Link>
            </li>
            <li>
              <Link
                href={Routes.SignUp}
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100  md:p-0 md:hover:bg-transparent md:hover:text-blue-700 "
              >
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        id="mega-menu-full-dropdown"
        className={
          showCities
            ? 'mt-1 w-full border-y border-gray-200 bg-gray-50 shadow-sm md:bg-white'
            : 'hidden'
        }
      >
        <div className="mx-auto grid max-w-screen-xl  px-4 py-5  text-gray-900 md:px-6">
          <ul className="grid grid-cols-2 gap-4">
            {locations &&
              Object.values(locations).map(location => (
                <li key={location.id}>
                  <Link
                    href={buildLocationUrl(location)}
                    className="block rounded-lg p-3 hover:bg-gray-100 "
                  >
                    <div className="font-semibold">{location.name}</div>
                    <span className="flex-row	justify-evenly">
                      {location.availableGames.map(game => (
                        <span
                          key={game.id}
                          className="mr-2 inline-flex w-fit	text-gray-500"
                        >
                          {React.createElement(getSportIcon(game.id), {
                            size: '25px',
                          })}
                        </span>
                      ))}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
