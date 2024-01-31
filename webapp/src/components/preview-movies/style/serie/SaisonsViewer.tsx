import { getGlobalInstance } from 'plume-ts-di';
import { useEffect, useState } from 'react';
import * as React from 'react';
import useLoader from '../../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import SerieService from '../../../../services/serie/SerieService';
import Episodes from './Episodes';

type Props = {
  id_serie: number,
};

function SaisonsViewer({ id_serie }: Props) {
  const [seasonsAvailable, setseasonsAvailable] = useState<number[]>();
  const serieService = getGlobalInstance(SerieService);
  const serieLoader = useLoader();

  useEffect(() => {
    serieLoader.monitor(serieService.getSeasonAvailable(id_serie)
      .then(setseasonsAvailable));
  }, [id_serie]);
  return (
    <div>
      {
        seasonsAvailable === undefined
          ? <h1>Contactez moi si vous voulez des épisodes !</h1>
          : seasonsAvailable.map((season) => (
            <Episodes id_serie={id_serie} season={season} key={id_serie} />
          ))
      }
    </div>
  );
}

export default SaisonsViewer;
