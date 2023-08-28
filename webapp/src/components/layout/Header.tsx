import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { useObservable } from 'micro-observables';
import classNames from 'classnames';
import LocaleSelector from '../theme/LocaleSelector';
import LocaleService from '../../i18n/locale/LocaleService';
import '../../../assets/scss/layouts/_header.scss';
import SearchBar from '../general/search/SearchBar';

type Props = {
  logo: string,
  navItems: string[],
  isLighter: boolean
};

function LocaleSelectorContainer() {
  const localeService = getGlobalInstance(LocaleService);
  const currentLocale = useObservable(localeService.getCurrentLocale());

  return <LocaleSelector
    currentLocale={currentLocale}
    availableLocales={localeService.getAvailableLocales()}
    onLocaleSelected={(newLocale) => localeService.setCurrentLocale(newLocale)}
  />;
}

export default function Header({ logo, navItems, isLighter }: Props) {
  return (
    <header className={classNames('header', { 'header--light': isLighter })}>
      {/* <LocaleSelectorContainer /> */}
      <div className="header__left">
        <img src={logo} alt="logo" className="logo" />
        {/* <ul>
          {navItems.map((navItem) => (<li key={navItem}>{navItem}</li>))}
        </ul> */}
      </div>
      {/* <div className="header__right">
        <SearchBar />
      </div> */}
    </header>
  );
}
