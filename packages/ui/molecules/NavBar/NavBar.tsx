import { useState } from 'react';
import Link from 'next/link';
import { Location } from 'schema';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import { WithDefaultProps } from '../../types';

type NavBarProps = WithDefaultProps<{
  locations: Location[];
}>;

export default function NavBar({ locations }: NavBarProps) {
  const [showCities, setShowCities] = useState(false);

  const onClick = () => setShowCities(!showCities);

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
                href="/"
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
                Locations{' '}
                {showCities ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
              </button>
            </li>
            <li>
              <Link
                href="/play"
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100  md:p-0 md:hover:bg-transparent md:hover:text-blue-700 "
              >
                Play Game
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
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
              locations.map(location => (
                <li>
                  <Link
                    href={`location/${location.name.toLowerCase()}`}
                    className="block rounded-lg p-3 hover:bg-gray-100 "
                    onClick={onClick}
                  >
                    <div className="font-semibold">{location.name}</div>
                    {location.availableGames.map(game => (
                      <span className="mr-2 text-sm font-light text-gray-500">
                        {game.name}
                      </span>
                    ))}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
