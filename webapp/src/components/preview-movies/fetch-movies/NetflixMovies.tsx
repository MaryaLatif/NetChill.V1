import React, { useEffect, useState } from 'react';
import { useObservable } from 'micro-observables';
import { getGlobalInstance } from 'plume-ts-di';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import MessageService from '../../../i18n/messages/MessageService';
import { Production } from '../../../api/types/MovieDbTypes';
import TopRow from '../style/row/TopRow';
import SerieService from '../../../services/serie/SerieService';

function NetflixMovies() {
  const serieService: SerieService = getGlobalInstance(SerieService);

  const [movie, setMovie] = useState<Production[]>([]);

  const messages = useObservable(getGlobalInstance(MessageService).getMessages());
  const movieLoader = useLoader();

  function fetchMovies() {
    movieLoader.monitor(serieService.getNetflixOriginals()
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
