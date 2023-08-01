import React, { useEffect, useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import { Production } from '../../../api/types/MovieDbTypes';
import Row from '../style/row/Row';
import MovieService from '../../../services/movie/MovieService';

function MoviesByGenre({ genre, id_genre }:{ genre:string, id_genre: number }) {
  const movieService: MovieService = getGlobalInstance(MovieService);
  const [movie, setMovie] = useState<Production[]>([]);
  const movieLoader = useLoader(); // permet d'avoir des infos sur l'état de la requête

  function fetchMovies() {
    movieLoader.monitor(movieService.getMoviesByGenre(id_genre)
      .then(setMovie));
  }
  useEffect(() => {
    fetchMovies();
  }, [id_genre]);

  // eslint-disable-next-line react/jsx-no-undef
  return <Row
    title={genre}
    movieList={movie}
    isDataLoading={movieLoader.isLoading}
    classType={`${genre}`}
  />;
}

export default MoviesByGenre;
