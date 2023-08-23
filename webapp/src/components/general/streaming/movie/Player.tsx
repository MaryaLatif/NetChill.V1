import React from 'react';
import '../../../../../assets/scss/components/general/streaming/movie/player.scss';
import { Play } from 'react-feather';

function Player() {
  return (
    <button className='play-button'>
      <Play />
    </button>
  );
}

export default Player;
