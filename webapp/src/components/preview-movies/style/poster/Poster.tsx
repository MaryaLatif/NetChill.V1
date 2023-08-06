import React, { useEffect, useState } from 'react';
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
  stopInterval: ()=>void
};
function Poster({
  title, overview, id, type, backdrop_path, isSelected, stopInterval,
}: Props) {
  const trailerService = getGlobalInstance(TrailerService);

  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  const [trailerUrl, setTrailerUrl] = useState<Trailer>();

  const movieLoader = useLoader();

  const opts = {
    height: '700px',
    width: window.innerWidth,
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };

  useEffect(() => {
    const apiCall = type === MediaType.MOVIE
      ? trailerService.getMovieTrailerById
      : trailerService.getSerieTrailerById;

    movieLoader.monitor(apiCall(id)
      .then(setTrailerUrl));
  }, [id]);

  return (
    showTrailer && trailerUrl && isSelected
      ? <YouTube opts={opts} videoId={trailerUrl.key} style={{ position: 'absolute', zIndex: 5 }} onPause={() => {
        setShowTrailer(false);
      }}/>
      : <div
      className={classNames('top_card', { 'top_card--selected': isSelected })}
      style={{ width: `${window.innerWidth}px` }}
    >
      <div id={'info'}>
        <h2>{title}</h2>
        <p>{overview}</p>
        <Player/>
      </div>
      <div className={'filter'} onClick={() => {
        stopInterval();
        setShowTrailer((prevState) => !prevState);
      }}></div>
      <PosterBackground title={title} path={backdrop_path} className={'top_img'}/>
    </div>
  );
}

export default Poster;
