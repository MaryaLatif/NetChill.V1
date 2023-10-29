import React from 'react';
import Player from '../../../general/streaming/movie/Player';

function MediaDetails({ movieId, title, overview }: { movieId: number, title: string, overview: string }) {
  return (
    <div id="info">
      <h2>{title}</h2>
      <p>{overview}</p>
      <Player movieId={movieId} />
    </div>
  );
}

export default MediaDetails;
