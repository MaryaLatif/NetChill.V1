import React, { useEffect, useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import PreviewMoviesService from '../../../services/preview-movies/PreviewMoviesService';
import { Production } from '../../../api/types/MovieDbTypes';
import Row from '../style/row/Row';

function MoviesByGenre({ genre, id_genre }:{ genre:string, id_genre: number }) {
  const previewMoviesService: PreviewMoviesService = getGlobalInstance(PreviewMoviesService);
  const [movie, setMovie] = useState<Production[]>([]);
  const movieLoader = useLoader(); // permet d'avoir des infos sur l'état de la requête

  function fetchMovies() {
    movieLoader.monitor(previewMoviesService.getMoviesByGenre(id_genre)
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
    classType={`${id_genre}`}
  />;
}

export default MoviesByGenre;
