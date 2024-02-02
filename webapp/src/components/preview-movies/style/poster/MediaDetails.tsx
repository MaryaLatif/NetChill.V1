import React from 'react';
import Player from '../../../general/streaming/movie/Player';

function MediaDetails({ title, overview, onClickButton }: { id_serie: number, genre_ids: number[], title: string, overview: string, onClickButton: ((event: React.MouseEvent) => void) | undefined}) {

  return (
    <div id="info">
      <h2>{title}</h2>
      <p>{overview}</p>
      <Player onClickPlay={onClickButton} />
    </div>
  );
}

export default MediaDetails;
