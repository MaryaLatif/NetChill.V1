import React from 'react';
import MoviesByGenre from './fetch-movies/MoviesByGenre';
import NetflixMovies from './fetch-movies/NetflixMovies';
import TrendingMovies from './fetch-movies/TrendingMovies';
import TopRatedMovies from './fetch-movies/TopRatedMovies';

function RenderMovies() {
  return (
    <div className={'app'}>
      <NetflixMovies/>
      <TopRatedMovies/>
      <TrendingMovies/>
      <MoviesByGenre genre={'Action'} id_genre={28}/>
      <MoviesByGenre genre={'Comedy'} id_genre={35}/>
      <MoviesByGenre genre={'Horror'} id_genre={27}/>
      <MoviesByGenre genre={'Romance'} id_genre={10749}/>
      <MoviesByGenre genre={'Documentaries'} id_genre={99}/>
    </div>
  );
}

export default RenderMovies;
