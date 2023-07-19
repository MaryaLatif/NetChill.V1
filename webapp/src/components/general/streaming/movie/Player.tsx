import React from 'react';
import icon from '../../../../../assets/icons/play.png';
import '../../../../../public/assets/css/player.css';

function Player() {
  return (
    <button className={'play'}>
      <img src={icon} alt={'play icon'} className={'play_icon'}/>
    </button>
  );
}

export default Player;
