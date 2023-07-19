import React, { useEffect, useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import PreviewMoviesService from '../../../services/preview-movies/PreviewMoviesService';
import { Movie } from '../../../api/types/MovieDbTypes';
import Row from '../style/row/Row';

function TrendingMovies() {
  const previewMoviesService: PreviewMoviesService = getGlobalInstance(PreviewMoviesService);

  const [movie, setMovie] = useState<Movie[]>([]);
  const movieLoading = useLoader();

  function fetchMovie() {
    movieLoading.monitor(previewMoviesService.getTrendingMovies()
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
      classType={'trending'}
    />
  );
}

export default TrendingMovies;
