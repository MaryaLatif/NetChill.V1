import React, { useEffect, useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import PreviewMoviesService from '../../../services/preview-movies/PreviewMoviesService';
import { Production } from '../../../api/types/MovieDbTypes';
import Row from '../style/row/Row';

function TopRatedMovies() {
  const previewMoviesServices: PreviewMoviesService = getGlobalInstance(PreviewMoviesService);

  const [movie, setMovie] = useState<Production[]>([]);
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
      classType={'top_rated'}
    />
  );
}

export default TopRatedMovies;
