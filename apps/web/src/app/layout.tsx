import RootProvider from './provider';
import '../../styles/globals.css';
import NavBar from '@src/components/organisms/NavBar/NavBar';
import { buildNavBarLinks } from '@src/components/organisms/NavBar/navBarConfig';
import { getApiInstance } from '@src/factory/apiFactory';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locations = await getApiInstance().location.getAllLocations();

  return (
    <html lang="en">
      <body>
        <RootProvider>
          <NavBar config={buildNavBarLinks(locations)} />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
