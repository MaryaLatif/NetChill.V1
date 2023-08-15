import React from 'react';
import YouTube from 'react-youtube';

type Props = {
  opts: {},
  videoKey: string,
  isShown: boolean,
  onPause: ()=>void,
  onEnd: ()=>void
};
function ShowLargeTrailer({
  opts, videoKey, isShown, onPause, onEnd,
}: Props) {
  return (
    <div
      className={`trailer-large${!isShown && '--hiden'}`}
    >
      <YouTube
        opts={opts}
        videoId={videoKey}
        // TODO [HOOK?]
        onPause={onPause}
        onEnd={onEnd}
        className='trailer-large__video'
      />
    </div>
  );
}

export default ShowLargeTrailer;
