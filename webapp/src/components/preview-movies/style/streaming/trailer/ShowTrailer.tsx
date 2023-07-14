import React from 'react';
import YouTube from 'react-youtube';
import logo from '../../../../../../assets/icons/cross.png';
import '../../../../../../public/assets/css/show-video.css';

function ShowTrailer({ url, overview, onRemove }: { url: string, overview: string, onRemove: () => void }) {
  const opts = {
    height: '500px',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div id={'parent-show-movie'}>
      <div className={'show-movie'}>
        <div className={'cross-parent'}>
          <img className={'cross'} src={logo} alt={'cross'} onClick={onRemove}/>
        </div>
        <YouTube videoId={url} opts={opts}/>
        <div className={'overview-parent'}>
          <h3>Overview</h3>
          <p className={'overview'}>{overview}</p>
        </div>
      </div>
    </div>
  );
}

export default ShowTrailer;
