import React from 'react';
import '../../../../assets/scss/components/general/search/search.scss';
import { Search } from 'react-feather';

function SearchBar() {
  return (
    <div className='search-bar'>
      <input type='search' id='site-search' placeholder='Search' />

      // TODO passer par un composant custom IconButton
      <button> <Search className='search-bar__icon'/> </button>
    </div>
  );
}

export default SearchBar;
