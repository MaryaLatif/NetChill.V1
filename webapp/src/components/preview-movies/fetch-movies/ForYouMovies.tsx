import { getGlobalInstance } from 'plume-ts-di';
import React, { useEffect, useState } from 'react';
import { Production } from '../../../api/types/MovieDbTypes';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import MovieService from '../../../services/movie/MovieService';
import Row from '../style/row/Row';

function ForYouMovies() {
  const movieService = getGlobalInstance(MovieService);
  const [movies, setMovies] = useState<Production[]>([]);
  const movieLoader = useLoader();

  function fetchMovies() {
    movieLoader.monitor(movieService.getForYou()
      .then(setMovies));
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return <Row title='For You' movieList={movies} isDataLoading={movieLoader.isLoading}/>;
}

export default ForYouMovies;
