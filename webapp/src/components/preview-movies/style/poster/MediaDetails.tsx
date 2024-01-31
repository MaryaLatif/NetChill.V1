import React, { useState } from 'react';
import { MediaType } from '../../../../api/types/MovieDbTypes';
import Player from '../../../general/streaming/movie/Player';
import EpisodesPopin from '../../../general/streaming/trailer/EpisodesPopin';

function MediaDetails({ id_serie, genre_ids, title, overview, onClickButton }: { id_serie: number, genre_ids: number[], title: string, overview: string, onClickButton: (() => void) | undefined}) {
  const [episodesVisible, setEpisodesVisible] = useState(false);

  function onClickPlayer(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    onClickButton?.();
    setEpisodesVisible(true);
  }

  function onClose(event: React.MouseEvent<HTMLDivElement, MouseEvent>){
    event.stopPropagation();
    setEpisodesVisible(false);
  }

  return (
    <div id="info">
      <h2>{title}</h2>
      <p>{overview}</p>
      <Player onClickPlay={onClickPlayer} />
      {
        episodesVisible &&
        <EpisodesPopin mediaId={id_serie} mediaType={MediaType.SERIE}  overview={overview} genreIds={genre_ids} onClose={onClose} />
      }
    </div>
  );
}

export default MediaDetails;
