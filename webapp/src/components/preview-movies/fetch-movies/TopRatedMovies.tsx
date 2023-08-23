import React, { useEffect, useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import GlobalService from '../../../services/preview-movies/GlobalService';
import { Production } from '../../../api/types/MovieDbTypes';
import Row from '../style/row/Row';
import MovieService from '../../../services/movie/MovieService';

function TopRatedMovies() {
  const movieService: MovieService = getGlobalInstance(MovieService);

  const [movie, setMovie] = useState<Production[]>([]);
  const movieLoading = useLoader();

  function fetchMovie() {
    movieLoading.monitor(movieService.getTopRatedMovies()
      .then(setMovie));
  }

  useEffect(() => {
    fetchMovie();
  }, [setMovie]);

  return (
    <Row
      title={'Top Rated'}
      movieList={movie}
      topRated={true}
      isDataLoading={movieLoading.isLoading}
      classType={'top_rated'}
    />
  );
}

export default TopRatedMovies;
