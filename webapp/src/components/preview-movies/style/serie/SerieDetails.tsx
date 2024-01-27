import { getGlobalInstance } from 'plume-ts-di';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { Production, Serie } from '../../../../api/types/MovieDbTypes';
import useLoader from '../../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import SerieService from '../../../../services/serie/SerieService';
import SaisonsViewer from './SaisonsViewer';

type Props = {
  id_serie: number,
};

function SerieDetails({ id_serie }: Props) {
  const serieApi = getGlobalInstance(SerieService);
  const serieLoader = useLoader();
  const [serie, setSerie] = useState<Production>();

  useEffect(() => {
    serieLoader.monitor(serieApi.getSerieById(id_serie)
      .then(setSerie));
  }, [id_serie]);

  return (
    <div>
        <SaisonsViewer id_serie={id_serie} totalSaisons={serie?.number_of_seasons} />
    </div>
  );
}

export default SerieDetails;
