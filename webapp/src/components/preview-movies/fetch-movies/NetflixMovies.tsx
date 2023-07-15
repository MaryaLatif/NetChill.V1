import React, { useEffect, useState } from 'react';
import { useObservable } from 'micro-observables';
import { getGlobalInstance } from 'plume-ts-di';
import PreviewApi, { Movie } from '../../../api/session/PreviewApi';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import ApiHttpClient from '../../../api/ApiHttpClient';
import Row from '../style/Row';
import MessageService from '../../../i18n/messages/MessageService';

const apiHttpClient = new ApiHttpClient();
const movieApi = new PreviewApi(apiHttpClient);
function NetflixMovies() {
  const [movie, setMovie] = useState<Movie[]>([]);

  const messages = useObservable(getGlobalInstance(MessageService).getMessages());
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
  return <Row title={messages.movieRow.netflix} movieList={movie} isLargerRow={true}/>;
}

export default NetflixMovies;
