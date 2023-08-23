import React, { useState } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import GlobalErrorBoundary from '../theme/GlobalErrorBoundary';
import logo from '../../../assets/icons/logo_transparent.png';
import Header from './Header';

type Props = {
  children: React.ReactNode;
};

const navItems: string[] = ['Home', 'Serie', 'Movie', 'Genre'];

export default function Layout({ children }: Props) {
  const [lighterHeader, setLighterHeader] = useState<boolean>(false);

  // TODO à revoir
  const topOfScreen: number = document.querySelectorAll('.row')[0]?.getBoundingClientRect().top;

  // TODO à revoir
  function handleScroll() {
    if (document.querySelectorAll('.row')[0].getBoundingClientRect().top >= topOfScreen) {
      setLighterHeader(true);
    } else {
      setLighterHeader(false);
    }
  }

  return <GlobalErrorBoundary>
    <Header logo={logo} navItems={navItems} isLighter={lighterHeader}/>
    {/* <Header /> */}
    <div className='content-layout' onScroll={handleScroll}>
      {children}
    </div>
    <ScrollRestoration/>
  </GlobalErrorBoundary>;
}
