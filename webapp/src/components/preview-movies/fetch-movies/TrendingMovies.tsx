import React, { useEffect, useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import GlobalService from '../../../services/preview-movies/GlobalService';
import { Production } from '../../../api/types/MovieDbTypes';
import Row from '../style/row/Row';

function TrendingMovies() {
  const globalService = getGlobalInstance(GlobalService);

  const [movie, setMovie] = useState<Production[]>([]);
  const movieLoading = useLoader();

  function fetchMovie() {
    movieLoading.monitor(globalService.getTrendingMovies()
      .then(setMovie));
  }

  useEffect(() => {
    fetchMovie();
  }, [setMovie]);

  return (
    <Row
      title={'Trending'}
      movieList={movie}
      isDataLoading={movieLoading.isLoading}
    />
  );
}

export default TrendingMovies;
