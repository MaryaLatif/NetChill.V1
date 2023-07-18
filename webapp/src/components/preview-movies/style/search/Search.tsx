import React from 'react';
import '../../../../../public/assets/css/search.css';
import logo from '../../../../../assets/icons/search.png';

function Search() {
  return (
    <div className={'search'}>
      <input type={'search'} id={'site-search'} placeholder={'Search'} />
      <button><img src={logo} alt={'search icon'} className={'search-icon'}/></button>
    </div>
  );
}

export default Search;
