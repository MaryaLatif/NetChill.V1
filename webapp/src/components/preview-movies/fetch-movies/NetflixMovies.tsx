import React, { useEffect, useState } from 'react';
import { useObservable } from 'micro-observables';
import { getGlobalInstance } from 'plume-ts-di';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import ApiHttpClient from '../../../api/ApiHttpClient';
import Row from '../style/Row';
import MessageService from '../../../i18n/messages/MessageService';
import { Movie } from '../../../api/preview-movies/PreviewApi';
import PreviewMoviesService from '../../../services/preview-movies/PreviewMoviesService';
import RowLoading from '../style/loading/RowLoading';

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
  <Row title={messages.movieRow.netflix} movieList={movie} isLargerRow={true} isDataLoading={movieLoader.isLoading}/>);
}

export default NetflixMovies;
