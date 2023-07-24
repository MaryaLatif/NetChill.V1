import React, { useEffect, useState } from 'react';
import { useObservable } from 'micro-observables';
import { getGlobalInstance } from 'plume-ts-di';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import MessageService from '../../../i18n/messages/MessageService';
import PreviewMoviesService from '../../../services/preview-movies/PreviewMoviesService';
import { Movie } from '../../../api/types/MovieDbTypes';
import Row from '../style/row/Row';
import TopRow from '../style/row/TopRow';

function NetflixMovies() {
  const previewMoviesServices: PreviewMoviesService = getGlobalInstance(PreviewMoviesService);

  const [movie, setMovie] = useState<Movie[]>([]);

  const messages = useObservable(getGlobalInstance(MessageService).getMessages());
  const movieLoader = useLoader();

  function fetchMovies() {
    movieLoader.monitor(previewMoviesServices.getNetflixOriginals()
      .then(setMovie));
  }

  useEffect(() => {
    fetchMovies();
  }, [setMovie]);
  return (
    <TopRow title={'NETFLIX ORIGINALS'} movieList={movie} isDataLoading={movieLoader.isLoading} />
  );
}

export default NetflixMovies;
