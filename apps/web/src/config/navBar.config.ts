import { NavBarButtonConfig, NavBarLinkConfig } from '@src/types/navBar';
import { Routes } from '@src/types/routes';
import { Location } from 'schema';
import NavBarLocationDropdownContent from '../components/molecules/NavBarLocationDropdownContent/NavBarLocationDropdownContent';

export const buildNavBarLinks: (
  locations: Location[],
) => (NavBarLinkConfig | NavBarButtonConfig)[] = (locations: Location[]) => [
  {
    type: 'link',
    name: 'Home',
    path: Routes.Home,
  },
  {
    type: 'button',
    name: 'Location',
    component: NavBarLocationDropdownContent(locations),
  },
  {
    type: 'link',
    name: 'Play Game',
    path: Routes.Lobby,
  },
  {
    type: 'link',
    name: 'Sign up',
    path: Routes.SignUp,
  },
];
