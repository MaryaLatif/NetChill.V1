import React from 'react';
import '../../../../public/assets/css/header.css';
import classNames from 'classnames';
import Search from './search/Search';

type Props = {
  logo: string,
  list: string[],
  scrollOk: boolean
};

function Header({ logo, list, scrollOk }: Props) {
  return (
    <div id={'header'} className={classNames({ scroll: scrollOk })}>
      <div id={'left'}>
        <img src={logo} alt={'logo'} className={'logo'}/>
        <ul>
          {list.map((element) => (
            <li key={element}>{element}</li>),
          )}
        </ul>
      </div>
      <div id={'right'}>
        <Search/>
      </div>
    </div>
  );
}

export default Header;
