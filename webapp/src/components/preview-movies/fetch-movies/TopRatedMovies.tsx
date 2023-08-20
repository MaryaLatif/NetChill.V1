import React, { useEffect, useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import { Production } from '../../../api/types/MovieDbTypes';
import Row from '../style/row/Row';
import MovieService from '../../../services/movie/MovieService';

function TopRatedMovies() {
  const movieService = getGlobalInstance(MovieService);

  const [movie, setMovie] = useState<Production[]>([]);
  const movieLoading = useLoader();

  function fetchMovie() {
    movieLoading.monitor(movieService.getTopRated()
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
    />
  );
}

export default TopRatedMovies;
