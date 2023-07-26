import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { useObservable } from 'micro-observables';
import classNames from 'classnames';
import LocaleSelector from '../theme/LocaleSelector';
import LocaleService from '../../i18n/locale/LocaleService';
import '../../../public/assets/css/header.css';
import SearchBar from '../general/search/SearchBar';

type Props = {
  logo: string,
  list: string[],
  scrollOk: boolean
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

export default function Header({ logo, list, scrollOk }: Props) {
  return (
    <header id="header" className={classNames({ scroll: scrollOk })}>
      {/* <LocaleSelectorContainer /> */}
      <div id='left'>
        <img src={logo} alt={'logo'} className='logo'/>
        <ul>
          {list.map((element) => (
            <li key={element}>{element}</li>),
          )}
        </ul>
      </div>
      <div id='right'>
        <SearchBar/>
      </div>
    </header>
  );
}
