import { getGlobalInstance } from 'plume-ts-di';
import { useEffect, useState } from 'react';
import * as React from 'react';
import '../../../../../assets/scss/components/style/serie.scss';
import { Episode, SeasonEpisodes } from '../../../../api/types/MovieDbTypes';
import useLoader from '../../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import SerieService from '../../../../services/serie/SerieService';

type Props = {
  id_serie: number,
  season: number
}

function Episodes({ id_serie, season }: Props) {
  const [episodes, setEpisodes] = useState<void | Episode[]>();
  const episodeLoader = useLoader();
  const serieService = getGlobalInstance(SerieService)

  useEffect(() => {
    episodeLoader.monitor(serieService.getEpisodes(id_serie, season)
      .then(setEpisodes))
  }, [season]);

  return (
    <div>

    </div>
  );
}

export default Episodes;
