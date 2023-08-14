import React from 'react';
import YouTube from 'react-youtube';
import '../../../../../assets/scss/components/general/streaming/trailer/show-trailer.scss';
import { XCircle } from 'react-feather';
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
    <div className='show-movie__container'>
      <div className='show-movie'>
        <div className='cross'>
          <XCircle onClick={onClose} className='cross__icon'/>
        </div>
        {url ? <YouTube videoId={url} opts={opts}/>
          : <ErrorTrailer/>
        }
        <Player />
        <div className='about-it'>
          <div className='about-it__overview__container'>
            <h3>Overview</h3>
            <p className='about-it__overview'>{overview}</p>
          </div>
          <GenreList genreId={genreIds} className='about-it__genre-list'/>
        </div>
      </div>
    </div>
  );
}

export default ShowTrailer;
