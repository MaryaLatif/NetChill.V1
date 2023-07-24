import React from 'react';
import '../../../../../public/assets/css/player.css';
import { Play } from 'react-feather';

function Player() {
  return (
    <button className={'play'}>
      <Play color={'white'} />
    </button>
  );
}

export default Player;
