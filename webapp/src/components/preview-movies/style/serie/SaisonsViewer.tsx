import * as React from 'react';
import '../../../../../assets/scss/components/style/serie.scss';
import Episodes from './Episodes';

type Props = {
  id_serie: number,
  totalSaisons?: number,
  seasonsAvailable?: number[],
};

function SaisonsViewer({ id_serie, totalSaisons, seasonsAvailable }: Props) {

  return (
    <div className="saison">
      <div className="saison-infos__container">
        <p className="saison-infos">Total saisons: {totalSaisons || 'erreur'}</p>
        <p className="saison-infos">Saisons disponibles: {seasonsAvailable ? seasonsAvailable.length : 0} </p>
      </div>
      {
        seasonsAvailable === undefined
          ? <h1>Contactez moi si vous voulez des épisodes !</h1>
          : seasonsAvailable.map((season) => {
            <Episodes id_serie={id_serie} season={season} />;
          })
      }
    </div>
  );
}

export default SaisonsViewer;
