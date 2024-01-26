import { getGlobalInstance } from 'plume-ts-di';
import React, { useEffect, useState } from 'react';
import { Production } from '../../../api/types/MovieDbTypes';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import SerieService from '../../../services/serie/SerieService';
import Row from '../style/row/Row';

function ForYouSeries() {
  const serieService = getGlobalInstance(SerieService);
  const [series, setSeries] = useState<Production[]>([]);
  const serieLoader = useLoader();

  function fetchMovies() {
    serieLoader.monitor(serieService.getForYou()
      .then(setSeries));
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return <Row title="Series For You" movieList={series} isDataLoading={serieLoader.isLoading} />;
}

export default ForYouSeries;
