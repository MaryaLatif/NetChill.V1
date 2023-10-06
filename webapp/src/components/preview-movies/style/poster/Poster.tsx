import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { getGlobalInstance } from 'plume-ts-di';
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
  backdrop_path: string,
  isSelected: boolean,
  isVisible: boolean,
  onStartTrailer?: () => void,
  onStopTrailer?: () => void
};

function Poster({
  title, overview, id, type, backdrop_path, isSelected, isVisible, onStartTrailer, onStopTrailer,
}: Props) {
  const trailerService = getGlobalInstance(TrailerService);

  const [isTrailerStarted, setIsTrailerStarted] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<Trailer>();

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
    <div
      ref={trailerRef}
      aria-hidden onClick={startTrailer}
      className={classNames('top-card', { 'top-card--selected': isSelected })}
    >
      <MediaDetails title={title} overview={overview} />

      <div >
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
  );
}

export default Poster;
