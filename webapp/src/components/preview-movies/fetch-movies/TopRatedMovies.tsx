import React, { useEffect, useState } from 'react';
import ApiHttpClient from '../../../api/ApiHttpClient';
import PreviewApi, { Movie } from '../../../api/session/PreviewApi';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import Row from '../style/Row';

const apiHttpClient = new ApiHttpClient();
const movieApi = new PreviewApi(apiHttpClient);

function TopRatedMovies() {
  const [movie, setMovie] = useState<Movie[]>([]);
  const movieLoading = useLoader();

  function fetchMovie() {
    movieLoading.monitor(movieApi.getTopRatedMovies()
      .then((res) => setMovie(res))
      .catch((err) => console.log(err)),
    );
  }

  useEffect(() => {
    fetchMovie();
  }, [setMovie]);

  if (movieLoading.isLoading) return <div>chargement en cours...</div>;
  return <Row title={'Top Rated'} movieList={movie}/>;
}

export default TopRatedMovies;
