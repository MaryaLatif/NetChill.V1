import React from 'react';
import YouTube from 'react-youtube';
import logo from '../../../../../assets/icons/fermer.png';
import '../../../../../public/assets/css/show-video.css';
import GenreList from '../../../preview-movies/style/genre/GenreList';
import ErrorTrailer from './ErrorTrailer';
import Player from '../movie/Player';

type Props = {
  url: string,
  overview: string,
  genreIds: number[],
  onClose: () => void,
};
function ShowTrailer({
  url, overview, genreIds, onClose,
}: Props) {
  const opts = {
    height: '500px',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div id={'parent-show-movie'}>
      <div id={'show-movie'}>
        <div className={'cross-parent'}>
          <img className={'cross'} src={logo} alt={'cross'} onClick={onClose}/>
        </div>
        { url ? <YouTube videoId={url} opts={opts}/>
          : <ErrorTrailer />
        }
        <Player />
        <div className={'about-it'}>
          <div className={'overview-parent'}>
            <h3>Overview</h3>
            <p className={'overview'}>{overview}</p>
          </div>
          <GenreList genreId={genreIds} className={'genre-list'}/>
        </div>
      </div>
    </div>
  );
}

export default ShowTrailer;
