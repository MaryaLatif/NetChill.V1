import React from 'react';
import Player from '../../../general/streaming/movie/Player';

function MediaDetails({ title, overview }:{ title: string, overview: string }) {
  return (
    <div id='info'>
      <h2>{title}</h2>
      <p>{overview}</p>
      <Player/>
    </div>
  );
}

export default MediaDetails;
