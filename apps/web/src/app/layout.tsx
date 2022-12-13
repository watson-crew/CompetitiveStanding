import RootProvider from './provider';
import '../../styles/globals.css';
import NavBar from '@src/components/organisms/NavBar/NavBar';
import { buildNavBarLinks } from '@src/components/organisms/NavBar/navBarConfig';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootProvider>
          <NavBar config={buildNavBarLinks(pageProps.locations)} />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}

export default RootLayout;
