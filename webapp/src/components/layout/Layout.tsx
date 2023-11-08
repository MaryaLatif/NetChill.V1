import React, { useRef, useState } from 'react';
import MediaQuery from 'react-responsive';
import { ScrollRestoration } from 'react-router-dom';
import GlobalErrorBoundary from '../theme/GlobalErrorBoundary';
import logo from '../../../assets/icons/logo-netchill.png';
import logoLong from '../../../assets/icons/logo-long-netchill.png';
import Header from './Header';

type Props = {
  children: React.ReactNode;
};

// const navItems: string[] = ['Home', 'Serie', 'Movie', 'Genre'];

export default function Layout({ children }: Props) {
  const [lighterHeader, setLighterHeader] = useState<boolean>(true);
  const headerRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    if (!headerRef.current) {
      return;
    }
    setLighterHeader(headerRef.current.scrollTop === 0);
  }
  return <GlobalErrorBoundary>
    <MediaQuery maxWidth={767}>
      <Header logo={logo} /* navItems={navItems} */ isLighter={lighterHeader}/>
    </MediaQuery>
    <MediaQuery minWidth={767}>
      <Header logo={logoLong} /* navItems={navItems} */ isLighter={lighterHeader}/>
    </MediaQuery>
    {/* <Header /> */}
    <div ref={headerRef} className='content-layout' onScroll={handleScroll}>
      {children}
    </div>
    <ScrollRestoration/>
  </GlobalErrorBoundary>;
}
