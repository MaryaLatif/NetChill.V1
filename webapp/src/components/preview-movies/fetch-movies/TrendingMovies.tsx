import React, { useEffect, useState } from 'react';
import Row from '../style/Row';
import ApiHttpClient from '../../../api/ApiHttpClient';
import PreviewApi, { Movie } from '../../../api/session/PreviewApi';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';

const apiHttpClient = new ApiHttpClient();
const movieApi = new PreviewApi(apiHttpClient);

function TrendingMovies() {
  const [movie, setMovie] = useState<Movie[]>([]);
  const movieLoading = useLoader();

  function fetchMovie() {
    movieLoading.monitor(movieApi.getTrendingMovies()
      .then((res) => setMovie(res))
      .catch((err) => console.log(err),
      ));
  }

  useEffect(() => {
    fetchMovie();
  }, [setMovie]);

  if (movieLoading.isLoading) return <div>chargement en cours...</div>;
  return <Row title={'Trending'} movieList={movie}/>;
}

export default TrendingMovies;
