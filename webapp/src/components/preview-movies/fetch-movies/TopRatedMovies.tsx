import React, { useEffect, useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { set } from 'react-hook-form';
import ApiHttpClient from '../../../api/ApiHttpClient';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import Row from '../style/Row';
import { Movie } from '../../../api/preview-movies/PreviewApi';
import PreviewMoviesService from '../../../services/preview-movies/PreviewMoviesService';

function TopRatedMovies() {
  const previewMoviesServices: PreviewMoviesService = getGlobalInstance(PreviewMoviesService);

  const [movie, setMovie] = useState<Movie[]>([]);
  const movieLoading = useLoader();

  function fetchMovie() {
    movieLoading.monitor(previewMoviesServices.getTopRatedMovies()
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
