import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import { XCircle } from 'react-feather';
import { Navigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import '../../../../../assets/scss/components/general/streaming/trailer/show-trailer.scss';
import { MediaType } from '../../../../api/types/MovieDbTypes';
import ConfigurationService from '../../../../services/configuration/ConfigurationService';
import GenreList from '../../../preview-movies/style/genre/GenreList';
import SerieDetails from '../../../preview-movies/style/serie/SerieDetails';
import { Popin } from '../../../theme/popin/Popin';
import Connection from '../../account/Connection';
import Player from '../movie/Player';
import ErrorTrailer from './ErrorTrailer';

type Props = {
  mediaId: number,
  title: string,
  mediaType: MediaType;
  url: string,
  overview: string,
  genreIds: number[],
  date: string,
  onClose: () => void,
};

function ShowTrailer({
                       mediaId, title, date, mediaType,
                       url, overview, genreIds, onClose,
                     }: Props) {
  const [connectionPopinVisible, setConnectionPopinVisible] = useState(false);
  const connectionKey = getGlobalInstance(ConfigurationService).getConnectionKey();
  const [redirectToStream, setRedirectToStream] = useState(false);

  const opts = {
    height: '500px',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  function handleSubmitAction(inputState: { value: string }) {
    if (inputState.value === connectionKey) {
      setRedirectToStream(true);
    }
  }

  function onClickPlayer() {
    setConnectionPopinVisible(true);
  }

  return (
    <Popin onClose={onClose}>
      {connectionPopinVisible
        ? <div className="connection-container">
          {redirectToStream && <Navigate to={`/stream/${mediaId}`} replace={true} />}
          <Connection handleSubmitAction={handleSubmitAction} />
        </div>
        : <div className="show-movie">
          {
            url
              ? <YouTube videoId={url} opts={opts} />
              : <ErrorTrailer />
          }
          {
            mediaType === MediaType.MOVIE ?
              <div>
                <Player onClickPlay={onClickPlayer} />
                <div className="about-it__container">
                  <div className="show-movie__header">
                    <h2>{title}</h2>
                    <p className="show-movie__header__date">{date}</p>
                    <GenreList genreId={genreIds} className="about-it__genre-list" />
                  </div>
                  <div className="about-it">
                    <div className="about-it__overview__container">
                      <h3>Overview</h3>
                      <p className="about-it__overview">{overview}</p>
                    </div>
                  </div>
                </div>
              </div>
              :
              mediaType === MediaType.SERIE
              && <SerieDetails id_serie={mediaId} genreIds={genreIds} />
          }

        </div>
      }
    </Popin>

    /*
          <div className='show-movie__container'>
            <div className='show-movie'>
              <div className='cross'>
                <XCircle onClick={onClose} className='cross__icon'/>
              </div>
              {
                url
                  ? <YouTube videoId={url} opts={opts} />
                  : <ErrorTrailer/>
              }
              {
                mediaType === MediaType.MOVIE
                  ? <Player movieId={mediaId} />
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

       */
  );
}

export default ShowTrailer;
