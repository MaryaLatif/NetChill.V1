import React, { useEffect, useState } from 'react';
import ApiHttpClient from '../../../api/ApiHttpClient';
import PreviewApi, { Movie } from '../../../api/session/PreviewApi';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import Row from '../style/Row';

const apiHttpClient = new ApiHttpClient();
const movieApi = new PreviewApi(apiHttpClient);

function MoviesByGenre({ genre, id_genre }:{ genre:string, id_genre: number }) {
  const [movie, setMovie] = useState<Movie[]>([]);
  const movieLoader = useLoader(); // permet d'avoir des infos sur l'état de la requête

  function fetchMovies() {
    movieLoader.monitor(movieApi.getTopOfMoviesByGenre(id_genre)
      .then((res) => {
        setMovie(res);
      })
      .catch((err) => console.log(err)));
  }
  useEffect(() => {
    fetchMovies();
  }, [id_genre]);

  return <Row title={genre} movieList={movie} isDataLoading={movieLoader.isLoading}/>;
}

export default MoviesByGenre;
