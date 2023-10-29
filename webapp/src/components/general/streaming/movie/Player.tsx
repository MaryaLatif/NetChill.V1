import React from 'react';
import '../../../../../assets/scss/components/general/streaming/movie/player.scss';
import { Play } from 'react-feather';

function Player({ movieId }: { movieId: number }) {
  return (
    <a href={`/stream/${movieId}`}>
      <button className="play-button">
        <Play />
      </button>
    </a>
  );
}

export default Player;
