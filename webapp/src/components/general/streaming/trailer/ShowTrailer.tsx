import React from 'react';
import { XCircle } from 'react-feather';
import YouTube from 'react-youtube';
import '../../../../../assets/scss/components/general/streaming/trailer/show-trailer.scss';
import { MediaType } from '../../../../api/types/MovieDbTypes';
import GenreList from '../../../preview-movies/style/genre/GenreList';
import SerieDetails from '../../../preview-movies/style/serie/SerieDetails';
import Player from '../movie/Player';
import ErrorTrailer from './ErrorTrailer';

type Props = {
  mediaId: number,
  mediaType: MediaType;
  url: string,
  overview: string,
  genreIds: number[],
  onClose: () => void,
};

function ShowTrailer({
  mediaId, mediaType,
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
        {
          url
            ? <YouTube videoId={url} opts={opts}/>
            : <ErrorTrailer/>
        }
        {
          mediaType === MediaType.MOVIE
            ? <Player movieId={mediaId}/>
            : <SerieDetails serieId={mediaId}/>
        }
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
