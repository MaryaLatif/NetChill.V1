import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { getGlobalInstance } from 'plume-ts-di';
import MediaQuery from 'react-responsive';
import PosterBackground from './PosterBackground';
import TrailerService from '../../../../services/streaming/TrailerService';
import { MediaType, Trailer } from '../../../../api/types/MovieDbTypes';
import useLoader from '../../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import MediaDetails from './MediaDetails';
import ShowLargeTrailer from '../../../general/streaming/trailer/ShowLargeTrailer';

type Props = {
  title: string,
  overview: string,
  id: number,
  type: string,
  genre_ids: number[],
  backdrop_path: string,
  isSelected: boolean,
  isVisible: boolean,
  onClickButton?: (event: React.MouseEvent) => void,
  onStartTrailer?: () => void,
  onStopTrailer?: () => void,
};

function Poster({
  title, overview, id, genre_ids,  type, backdrop_path, isSelected, isVisible, onStartTrailer,  onClickButton, onStopTrailer,
}: Props) {
  const trailerService = getGlobalInstance(TrailerService);

  const [isTrailerStarted, setIsTrailerStarted] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<Trailer | null>();

  const trailerRef = useRef<HTMLDivElement>(null);

  const movieLoader = useLoader();

  const startTrailer = () => {
    if (!trailerUrl) {
      return;
    }
    onStartTrailer?.();
    setIsTrailerStarted(true);
  };

  const stopTrailer = () => {
    if (!trailerUrl) {
      return;
    }
    onStopTrailer?.();
    setIsTrailerStarted(false);
  };

  useEffect(() => {
    const apiCall = type === MediaType.MOVIE
      ? trailerService.getTrailerByMovieId
      : trailerService.getTrailerBySerieId;

    movieLoader.monitor(apiCall(id)
      .then(setTrailerUrl));
  }, [id]);

  useEffect(() => {
    if (!isVisible) {
      setIsTrailerStarted(false);
    }
  }, [isVisible]);

  return (
    <div>
      <div
        ref={trailerRef}
        aria-hidden onClick={startTrailer}
        className={classNames('top-card', { 'top-card--selected': isSelected })}
      >
        <MediaQuery minWidth={767}>
          <MediaDetails id_serie={id} title={title} overview={overview} genre_ids={genre_ids} onClickButton={onClickButton} />
        </MediaQuery>

        <div>
          <PosterBackground className="top-card__img" title={title} path={backdrop_path} />
        </div>

        {
          isTrailerStarted
          && trailerUrl
          && (
            <ShowLargeTrailer
              videoKey={trailerUrl.key}
              onPause={stopTrailer}
              onEnd={stopTrailer}
            />
          )}
      </div>
      <MediaQuery maxWidth={767}>
        <MediaDetails id_serie={id} title={title} overview={overview} genre_ids={genre_ids} onClickButton={onClickButton}/>
      </MediaQuery>
    </div>
  );
}

export default Poster;
