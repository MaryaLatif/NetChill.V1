import React from 'react';
import '../../../../public/assets/css/search.css';
import { Search } from 'react-feather';

function SearchBar() {
  return (
    <div className={'search'}>
      <input type={'search'} id={'site-search'} placeholder={'Search'} />
      <button> <Search color={'white'} height={'20px'}/> </button>
    </div>
  );
}

export default SearchBar;
