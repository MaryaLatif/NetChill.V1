import React, { useEffect, useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import Row from '../style/Row';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import { Movie } from '../../../api/preview-movies/PreviewApi';
import PreviewMoviesService from '../../../services/preview-movies/PreviewMoviesService';

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
    />
  );
}

export default TrendingMovies;
