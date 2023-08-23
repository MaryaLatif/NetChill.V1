import React, { useEffect, useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import { Production } from '../../../api/types/MovieDbTypes';
import Row from '../style/row/Row';
import MovieService from '../../../services/movie/MovieService';

type Props = {
  genre: string,
  idGenre: number
};

function MoviesByGenre({ genre, idGenre }: Props) {
  const movieService = getGlobalInstance(MovieService);

  const [movie, setMovie] = useState<Production[]>([]);

  const movieLoader = useLoader(); // permet d'avoir des infos sur l'état de la requête

  function fetchMovies() {
    movieLoader.monitor(movieService.getTopRatedByGenre(idGenre)
      .then(setMovie));
  }

  useEffect(() => {
    fetchMovies();
  }, [idGenre]);

  // eslint-disable-next-line react/jsx-no-undef
  return <Row
    title={genre}
    movieList={movie}
    isDataLoading={movieLoader.isLoading}
  />;
}

export default MoviesByGenre;
