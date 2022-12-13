export type NavBarLinkConfig = {
  type: 'link';
  name: string;
  path: string;
};

export type NavBarButtonConfig = {
  type: 'button';
  name: string;
  component: React.ReactElement;
};
