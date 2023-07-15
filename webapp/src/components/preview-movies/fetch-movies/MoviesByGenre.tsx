import React, { useEffect, useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import Row from '../style/Row';
import PreviewMoviesService from '../../../services/preview-movies/PreviewMoviesService';
import { Movie } from '../../../api/preview-movies/PreviewApi';

function MoviesByGenre({ genre, id_genre }:{ genre:string, id_genre: number }) {
  const previewMoviesService: PreviewMoviesService = getGlobalInstance(PreviewMoviesService);
  const [movie, setMovie] = useState<Movie[]>([]);
  const movieLoader = useLoader(); // permet d'avoir des infos sur l'état de la requête

  function fetchMovies() {
    movieLoader.monitor(previewMoviesService.getMoviesByGenre(id_genre)
      .then(setMovie));
  }
  useEffect(() => {
    fetchMovies();
  }, [id_genre]);

  return <Row title={genre} movieList={movie} isDataLoading={movieLoader.isLoading}/>;
}

export default MoviesByGenre;
