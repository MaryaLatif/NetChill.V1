import React, { useEffect, useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import { Production } from '../../../api/types/MovieDbTypes';
import TopRow from '../style/row/TopRow';
import SerieService from '../../../services/serie/SerieService';

function NetflixMovies() {
  const serieService = getGlobalInstance(SerieService);

  const [movie, setMovie] = useState<Production[]>([]);

  const movieLoader = useLoader();

  function fetchMovies() {
    movieLoader.monitor(serieService.getNetflixOriginals()
      .then(setMovie));
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <TopRow title={'NETFLIX ORIGINALS'} movieList={movie} isDataLoading={movieLoader.isLoading} />
  );
}

export default NetflixMovies;
