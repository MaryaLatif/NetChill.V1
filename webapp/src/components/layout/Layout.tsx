import React, { useRef, useState } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import GlobalErrorBoundary from '../theme/GlobalErrorBoundary';
import logo from '../../../assets/icons/logo_transparent.png';
import Header from '../preview-movies/style/Header';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [scrollOk, setScrollOk] = useState<boolean>(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const scrollOff: number = document.querySelectorAll('.row')[0]?.getBoundingClientRect().top;
  function handleScroll() {
    if (document.querySelectorAll('.row')[0].getBoundingClientRect().top >= scrollOff) setScrollOk(false);
    else setScrollOk(true);
  }
  return <GlobalErrorBoundary>
    <Header logo={logo} scrollOk={scrollOk} />
    {/* <Header /> */}
    <div className="content-layout" ref={boxRef} onScroll={handleScroll}>
      {children}
    </div>
    <ScrollRestoration />
  </GlobalErrorBoundary>;
}
