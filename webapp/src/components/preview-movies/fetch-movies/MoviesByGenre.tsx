import React, { useEffect, useState } from 'react';
import ApiHttpClient from '../../../api/ApiHttpClient';
import MoviePreviewApi, { Movie } from '../../../api/session/MoviePreviewApi';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import Row from '../style/Row';

const apiHttpClient = new ApiHttpClient();
const movieApi = new MoviePreviewApi(apiHttpClient);

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
  if (movieLoader.isLoading) return <div>chargement en cours...</div>;
  return <Row title={genre} movieList={movie} />;
}

export default MoviesByGenre;
