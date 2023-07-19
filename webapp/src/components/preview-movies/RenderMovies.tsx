import React, { useEffect, useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import MoviesByGenre from './fetch-movies/MoviesByGenre';
import NetflixMovies from './fetch-movies/NetflixMovies';
import TrendingMovies from './fetch-movies/TrendingMovies';
import TopRatedMovies from './fetch-movies/TopRatedMovies';
import useLoader from '../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import PreviewMoviesService from '../../services/preview-movies/PreviewMoviesService';
import { Genre } from '../../api/types/MovieDbTypes';

function RenderMovies() {
  const previewMoviesService: PreviewMoviesService = getGlobalInstance(PreviewMoviesService);

  const [genres, setGenres] = useState<Genre[]>([]);

  const movieLoader = useLoader();

  useEffect(() => {
    movieLoader.monitor(previewMoviesService.getPreviewGenres()
      .then(setGenres));
  }, [genres]);

  return (
    <div className={'app'}>
      <NetflixMovies/>
      <TopRatedMovies/>
      <TrendingMovies/>
      {genres.map((genre) => (
        <MoviesByGenre key={genre.id} genre={genre.name} id_genre={genre.id}/>
      ))}
    </div>
  );
}

export default RenderMovies;
