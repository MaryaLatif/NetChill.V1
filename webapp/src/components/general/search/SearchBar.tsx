import React from 'react';
import '../../../../assets/scss/components/general/search/search.scss';
import { Search } from 'react-feather';
import IconButton from '../../theme/action/IconButton';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="search" id="site-search" placeholder="Search" />
      <IconButton><Search className="search-bar__icon" /></IconButton>
    </div>
  );
}

export default SearchBar;
