import React from 'react';
import '../../../../../assets/scss/components/general/streaming/movie/player.scss';
import { Play } from 'react-feather';

function Player({ onClickPlay }: { onClickPlay?: ()=>void }) {
  return (
    <div>
      <button className="play-button" onClick={onClickPlay}>
        <Play />
      </button>
    </div>
  );
}

export default Player;
