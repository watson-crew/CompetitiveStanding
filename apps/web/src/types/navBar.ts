import { UrlObject } from 'url';

export type NavBarLinkConfig = {
  type: 'link';
  name: string;
  path: string | UrlObject;
};

export type NavBarButtonConfig = {
  type: 'button';
  name: string;
  component: React.ReactElement;
};
