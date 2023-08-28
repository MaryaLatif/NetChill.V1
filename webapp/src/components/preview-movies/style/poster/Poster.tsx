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
  onShowTrailer?: () => void,
  onHideTrailer?: () => void
};

const SHOW_TRAILER_TIMER: number = 1_000;

function Poster({
                  title, overview, id, type, backdrop_path, isSelected, onShowTrailer, onHideTrailer,
                }: Props) {
  const trailerService = getGlobalInstance(TrailerService);

  const [isTrailerShown, setIsTrailerShown] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<Trailer>();
  const [trailerOpacityOne, setTrailerOpacityOne] = useState(false);

  const trailer = useRef<HTMLDivElement>(null);

  const movieLoader = useLoader();

  const showTrailer = () => {
    if (!trailerUrl) {
      return;
    }
    onShowTrailer?.();
    setIsTrailerShown(true);
  };

  const hideTrailer = () => {
    if (!trailerUrl) {
      return;
    }
    onHideTrailer?.();
    setIsTrailerShown(false);
  };

  useEffect(() => {
    if (!trailer.current) {
      return;
    }

    // TODO
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio < 0.25) {
          setIsTrailerShown(false);
        }
      }, {
        threshold: 0.25,
      });

    observer.observe(trailer.current);

    return () => observer.disconnect();
  }, [trailer.current]);

  useEffect(() => {
    const apiCall = type === MediaType.MOVIE
      ? trailerService.getTrailerByMovieId
      : trailerService.getTrailerBySerieId;

    movieLoader.monitor(apiCall(id)
      .then(setTrailerUrl));
  }, [id]);

  return (
    <div
      ref={trailer}
      className={classNames('top-card', { 'top-card--selected': isSelected })}
    >
      <MediaDetails title={title} overview={overview} />

      <div aria-hidden onClick={showTrailer}>
        <PosterBackground className="top-card__img" title={title} path={backdrop_path} />
      </div>

      {isTrailerShown && trailerUrl
        && (
          <ShowLargeTrailer
            videoKey={trailerUrl.key}
            onPause={hideTrailer}
            onEnd={hideTrailer}
            />
        )}
    </div>
  );
}

export default Poster;
