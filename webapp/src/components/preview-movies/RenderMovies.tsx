import React, { useEffect, useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import ForYouMovies from './fetch-movies/ForYouMovies';
import ForYouSeries from './fetch-movies/ForYouSeries';
import MoviesByGenre from './fetch-movies/MoviesByGenre';
import NetflixMovies from './fetch-movies/NetflixMovies';
import TrendingMovies from './fetch-movies/TrendingMovies';
import TopRatedMovies from './fetch-movies/TopRatedMovies';
import useLoader from '../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import { Genre } from '../../api/types/MovieDbTypes';
import GenreService from '../../services/genre/GenreService';

function RenderMovies() {
  const genreService: GenreService = getGlobalInstance(GenreService);

  const [genres, setGenres] = useState<Genre[]>([]);

  const movieLoader = useLoader();

  useEffect(() => {
    movieLoader.monitor(genreService.getPreviewGenres()
      .then(setGenres));
  }, []);

  return (
    <div className={'app'}>
      <NetflixMovies />
      <ForYouSeries />
      <ForYouMovies />
      <TopRatedMovies />
      <TrendingMovies />
      {genres.map((genre) => (
        <MoviesByGenre key={genre.id} genre={genre.name} idGenre={genre.id} />
      ))}
    </div>
  );
}

export default RenderMovies;
