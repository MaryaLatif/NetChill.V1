import React from 'react';
import YouTube from 'react-youtube';
import logo from '../../../../../../assets/icons/cross.png';
import '../../../../../../public/assets/css/show-video.css';
import GenreList from '../../genre/GenreList';

function ShowTrailer({
  url, overview, genreIds, onClose,
}: { url: string, overview: string, genreIds: number[], onClose: () => void }) {
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
          <img className={'cross'} src={logo} alt={'cross'} onClick={onClose}/>
        </div>
        <YouTube videoId={url} opts={opts}/>
        <div className={'overview-parent'}>
          <h3>Overview</h3>
          <p className={'overview'}>{overview}</p>
        </div>
        <GenreList genreId={genreIds}/>
      </div>
    </div>
  );
}

export default ShowTrailer;
