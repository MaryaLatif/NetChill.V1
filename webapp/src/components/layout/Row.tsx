import React from 'react';
import '../../../public/assets/css/row.css';
import MoviesByGenreService from '../../services/movie/MoviesByGenreService';

function Row() {
  return (
    <MoviesByGenreService title={'Action'} id_genre={28} isLargerRow={false}/>
  );
}

export default Row;
