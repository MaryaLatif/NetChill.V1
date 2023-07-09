import React, { useEffect, useState } from 'react';
import MovieApi, { Movie } from '../../../api/session/MovieApi';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import ApiHttpClient from '../../../api/ApiHttpClient';
import Row from '../style/Row';

const apiHttpClient = new ApiHttpClient();
const movieApi = new MovieApi(apiHttpClient);
function NetflixMovies() {
  const [movie, setMovie] = useState<Movie[]>([]);
  const movieLoader = useLoader();

  function fetchMovies() {
    movieLoader.monitor(movieApi.getNetflixOriginals()
      .then((res) => setMovie(res),
      )
      .catch((err) => console.log(err),
      ));
  }
  useEffect(() => {
    fetchMovies();
  }, [setMovie]);
  if (movieLoader.isLoading) return <div>chargement en cours...</div>;
  return <Row title={'NETFLIX ORIGINALS'} movieList={movie} isLargerRow={true}/>;
}

export default NetflixMovies;
