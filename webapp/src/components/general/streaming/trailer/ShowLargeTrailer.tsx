import classNames from 'classnames';
import React, { useState } from 'react';
import YouTube from 'react-youtube';
import '../../../../../assets/scss/components/general/streaming/trailer/show-trailer.scss';

type Props = {
  videoKey: string,
  onPause: ()=>void,
  onEnd: ()=>void
};

const opts = {
  playerVars: {
    autoplay: 1,
    controls: 0,
  },
};
function ShowLargeTrailer({
  videoKey, onPause, onEnd,
}: Props) {
  const [ready, setReady] = useState(false);
  return (
    <div
      className={classNames('trailer-large', { 'trailer-large--hiden': !ready })}
    >
      <YouTube
        opts={opts}
        videoId={videoKey}
        loading='lazy'
        onReady={() => setReady(true)}
        onPause={onPause}
        onEnd={onEnd}
      />
    </div>
  );
}

export default ShowLargeTrailer;
