import React from 'react';
import '../../../../public/assets/css/header.css';
import classNames from 'classnames';

function Header({ logo, scrollOk }:{ logo:string, scrollOk: boolean }) {
  return (
    <div id={'header'} className={classNames({ scroll: scrollOk })}>
      <img src={logo} alt={'logo Netchill'} className={'logo'}/>
      <ul>
        <li>
          Home
        </li>
        <li>
          Serie
        </li>
        <li>
          Film
        </li>
      </ul>
    </div>
  );
}
export default Header;
