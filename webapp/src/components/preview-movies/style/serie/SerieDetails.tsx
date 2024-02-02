import { getGlobalInstance } from 'plume-ts-di';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { Production } from '../../../../api/types/MovieDbTypes';
import useLoader from '../../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import SerieService from '../../../../services/serie/SerieService';
import GenreList from '../genre/GenreList';
import SaisonsViewer from './SaisonsViewer';
import '../../../../../assets/scss/components/style/serie.scss';

type Props = {
  id_serie: number,
  genreIds: number[],
};

function SerieDetails({ id_serie, genreIds }: Props) {
  const serieApi = getGlobalInstance(SerieService);
  const serieLoader = useLoader();
  const [serie, setSerie] = useState<Production>();

  useEffect(() => {
    serieLoader.monitor(serieApi.getSerieById(id_serie)
      .then(setSerie));
  }, [id_serie]);

  return (
    <div className="season">
      <h2>{serie?.title}</h2>
      <p className="season-infos">Total saisons: {serie?.number_of_seasons} | &nbsp; <span>
        <GenreList genreId={genreIds} className="about-it__genre-list" />
      </span></p>
      <div className="about-it">
        <div className="about-it__overview__container">
          <h3>Overview</h3>
          <p className="about-it__overview">{serie?.overview}</p>
        </div>
      </div>
      <SaisonsViewer id_serie={id_serie} />
    </div>
  );
}

export default SerieDetails;
