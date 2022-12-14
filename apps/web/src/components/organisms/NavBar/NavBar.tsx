import { useEffect, useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import {
  NavBarNavigationButton,
  NavBarNavigationLink,
} from './NavBarNavigationLinks/NavBarNavigationLinks';
import { NavBarLinkConfig, NavBarButtonConfig } from '@src/types/navBar';

export default function NavBar({
  config,
}: {
  config: (NavBarLinkConfig | NavBarButtonConfig)[];
}) {
  const [menuContent, setMenuContent] = useState<{
    component: React.ReactElement;
    name: string;
  }>();

  const setNavBarContent = (name: string, component: React.ReactElement) => {
    setMenuContent(prev => {
      if (prev?.name === name) {
        return undefined;
      }

      return { component: component, name: name };
    });
  };

  const router = useRouter();

  useEffect(() => {
    setMenuContent(undefined);
  }, [router.asPath]);

  const navBarLinks = config.map(nav => {
    if (nav.type === 'link') {
      return (
        <NavBarNavigationLink name={nav.name} path={nav.path} key={nav.name} />
      );
    }
    if (nav.type === 'button') {
      return (
        <NavBarNavigationButton
          name={nav.name}
          isExpanded={menuContent?.name === nav.name}
          onClick={() => setNavBarContent(nav.name, nav.component)}
          key={nav.name}
        />
      );
    }
  });

  return (
    <nav className="border-gray-200">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-2.5 md:px-6">
        <Link href="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-xl font-semibold">
            Competitive standing
          </span>
        </Link>
        <div
          id="mega-menu-full"
          className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
        >
          <ul className="border-gray-10 mt-4 flex flex-col rounded-lg border p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:text-sm md:font-medium">
            {navBarLinks}
          </ul>
        </div>
      </div>
      <div
        id="mega-menu-full-dropdown"
        className={
          !!menuContent
            ? 'mt-1 w-full border-y border-gray-200 shadow-sm'
            : 'hidden'
        }
      >
        {menuContent?.component && menuContent.component}
      </div>
    </nav>
  );
}
