import { getGlobalInstance } from 'plume-ts-di';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { Serie } from '../../../../api/types/MovieDbTypes';
import useLoader from '../../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import SerieService from '../../../../services/serie/SerieService';
import SaisonsViewer from './SaisonsViewer';

type Props = {
  serieId: number,
};

function SerieDetails({ serieId }: Props) {
  const serieApi = getGlobalInstance(SerieService);
  const serieLoader = useLoader();
  const [serie, setSerie] = useState<Serie>();

  useEffect(() => {
    serieLoader.monitor(serieApi.getSerieById(serieId)
      .then(setSerie));
  }, [serieId]);

  return (
    <div>
        <SaisonsViewer totalSaisons={serie?.number_of_seasons} />
    </div>
  );
}

export default SerieDetails;
