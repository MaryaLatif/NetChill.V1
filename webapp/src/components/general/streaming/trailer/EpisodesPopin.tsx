import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../../../../../assets/scss/components/general/streaming/trailer/show-trailer.scss';
import { MediaType } from '../../../../api/types/MovieDbTypes';
import ConfigurationService from '../../../../services/configuration/ConfigurationService';
import GenreList from '../../../preview-movies/style/genre/GenreList';
import SerieDetails from '../../../preview-movies/style/serie/SerieDetails';
import { Popin } from '../../../theme/popin/Popin';
import Connection from '../../account/Connection';
import Player from '../movie/Player';

type Props = {
  mediaId: number,
  mediaType: MediaType;
  overview?: string,
  genreIds: number[],
  onClose?: (event: React.MouseEvent) => void,
};

function EpisodesPopin({
                       mediaId, mediaType,
                        overview, genreIds, onClose,
                     }: Props) {
  const [connectionPopinVisible, setConnectionPopinVisible] = useState(false);
  const connectionKey = getGlobalInstance(ConfigurationService).getConnectionKey();
  const [redirectToStream, setRedirectToStream] = useState(false);

  function handleSubmitAction(inputState: { value: string }) {
    if (inputState.value === connectionKey) {
      setRedirectToStream(true);
    }
  }

  function onClickPlayer() {
    setConnectionPopinVisible(true);
  }

  return (
    <Popin onClose={onClose} className={'row-top__popin'}>
      {connectionPopinVisible
        ? <div className='connection-container'>
          {redirectToStream && <Navigate to={`/stream/${mediaId}`} replace={true} />}
          <Connection handleSubmitAction={handleSubmitAction} />
        </div>
        : <div className="show-movie">
          {
            mediaType === MediaType.MOVIE
              ? <Player onClickPlay={onClickPlayer}/>
              : <SerieDetails id_serie={mediaId} genreIds={genreIds} />
          }
        </div>
      }
    </Popin>
  );
}

export default EpisodesPopin;
