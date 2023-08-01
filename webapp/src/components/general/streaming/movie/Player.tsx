import React from 'react';
import '../../../../../assets/scss/components/player.scss';
import { Play } from 'react-feather';

function Player({ offset }: { offset?: string }) {
  return (
    <button className={'play'} style={{ margin: offset }}>
      <Play color={'white'} />
    </button>
  );
}

export default Player;
