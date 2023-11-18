import * as React from 'react';

type Props = {
  totalSaisons?: number,
  saisonsList?: [],
};
function SaisonsViewer({ totalSaisons, saisonsList }: Props) {
  return (
    <div>
      <p>Total saisons: {totalSaisons || 'erreur'}</p>
      {
        saisonsList === undefined
          ? <h1>Contactez moi si vous voulez des épisodes !</h1>
          : <h1>Saisons...</h1>
      }
    </div>
  );
}

export default SaisonsViewer;
