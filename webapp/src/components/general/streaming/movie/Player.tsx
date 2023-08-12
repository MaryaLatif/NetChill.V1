import React from 'react';
import '../../../../../assets/scss/components/general/streaming/movie/player.scss';
import { Play } from 'react-feather';

function Player() {
  return (
    <button className='play'>
      <Play className='play__icon' />
    </button>
  );
}

export default Player;
