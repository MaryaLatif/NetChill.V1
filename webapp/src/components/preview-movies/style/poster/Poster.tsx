import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import YouTube from 'react-youtube';
import { getGlobalInstance } from 'plume-ts-di';
import Player from '../../../general/streaming/movie/Player';
import PosterBackground from './PosterBackground';
import TrailerService from '../../../../services/streaming/TrailerService';
import { MediaType, Trailer } from '../../../../api/types/MovieDbTypes';
import useLoader from '../../../../lib/plume-http-react-hook-loader/promiseLoaderHook';

type Props = {
  title: string,
  overview: string,
  id: number,
  type: string,
  backdrop_path: string,
  isSelected: boolean,
  stopInterval: () => void
};

function Poster({
  title, overview, id, type, backdrop_path, isSelected, stopInterval,
}: Props) {
  const trailerService = getGlobalInstance(TrailerService);

  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  const [trailerUrl, setTrailerUrl] = useState<Trailer>();
  const [trailerOpacityOne, setTrailerOpacityOne] = useState(false);

  const trailer = useRef<HTMLDivElement>(null);

  const movieLoader = useLoader();

  const opts = {
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };

  useEffect(() => {
    if (!trailer.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio < 0.25) {
          setShowTrailer(false);
        }
      }, {
        threshold: 0.25,
      });

    observer.observe(trailer.current);

    return () => observer.disconnect();
  }, [trailer.current]);

  useEffect(() => {
    console.log(showTrailer);
  }, [showTrailer]);

  useEffect(() => {
    const apiCall = type === MediaType.MOVIE
      ? trailerService.getMovieTrailerById
      : trailerService.getSerieTrailerById;

    movieLoader.monitor(apiCall(id)
      .then(setTrailerUrl));
  }, [id]);

  return (
    <div
      ref={trailer}
      className={classNames('top-card', { 'top-card--selected': isSelected })}
    >
      <div id='info'>
        <h2>{title}</h2>
        <p>{overview}</p>
        <Player/>
      </div>

      <div className='top-card--filter'
           onClick={() => {
             stopInterval();

             setShowTrailer((prevState) => !prevState);

             setInterval(() => {
               setTrailerOpacityOne(true);
             }, 1000);
           }}>
      </div>
      <PosterBackground title={title} path={backdrop_path} className='top-card__img'/>
      {showTrailer && trailerUrl
        && <div
          className={classNames('trailer-large',
            { 'trailer-large--hiden': !trailerOpacityOne },
            { 'trailer-large--show': trailerOpacityOne })}
        >
          <YouTube
            opts={opts}
            videoId={trailerUrl.key}
            // TODO [HOOK?]
            onPause={() => {
              setTrailerOpacityOne(false);
              setInterval(() => {
                setShowTrailer((prevState) => !prevState);
              }, 1000);
            }}
            onEnd={() => {
              setShowTrailer(false);
            }}
            className='trailer-large__video'
          /></div>}
    </div>
  );
}

export default Poster;
