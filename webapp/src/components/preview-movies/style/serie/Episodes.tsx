import classNames from 'classnames';
import { getGlobalInstance } from 'plume-ts-di';
import { ReactEventHandler, useEffect, useRef, useState } from 'react';
import * as React from 'react';
import '../../../../../assets/scss/components/style/serie.scss';
import '../../../../../assets/scss/components/style/arrow/arrow.scss';
import { ChevronDown, ChevronsUp, ChevronUp } from 'react-feather';
import { Navigate } from 'react-router-dom';
import { Episode } from '../../../../api/types/MovieDbTypes';
import useLoader from '../../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import SerieService from '../../../../services/serie/SerieService';
import Arrow from '../arrow/Arrow';
import Slider from '../slider/Slider';

type Props = {
  id_serie: number,
  season: number
}

function Episodes({ id_serie, season }: Props) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [episodesVisible, setEpisodesVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const episodeLoader = useLoader();
  const serieService = getGlobalInstance(SerieService);
  const sliderRef = useRef<HTMLDivElement>(null);

  function handleClickArrowRight() {
    setCurrentPosition((prevState) => {
      if (!sliderRef.current) {
        return prevState;
      }

      if (Math.ceil(sliderRef.current.scrollLeft) + sliderRef.current.offsetWidth >= sliderRef.current.scrollWidth) {
        return 0;
      }

      return prevState + 1;
    });
  }

  function handleClickArrowLeft() {
    if (!sliderRef.current) {
      return;
    }

    setCurrentPosition((prevState) => prevState - 1);
  }

  function handleClickSetVisible() {
    setEpisodesVisible(prevState => !prevState);
  }

  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    sliderRef.current.scrollLeft = currentPosition * sliderRef.current.offsetWidth;
  }, [currentPosition]);

  useEffect(() => {
    episodeLoader.monitor(serieService.getEpisodes(id_serie, season)
      .then(setEpisodes));
  }, [season]);

  return (
    <div className="episodes-container">
      <h3 className="season-infos season-button"
          onClick={handleClickSetVisible}>Saison {season} &nbsp; <ChevronUp
        className={classNames({ 'season__selected': episodesVisible })} /> {}</h3>
      <Slider
        isArrowLeftVisible={currentPosition > 0}
        isArrowRightVisible
        onClickArrowRight={handleClickArrowRight}
        onClickArrowLeft={handleClickArrowLeft}>
        <div ref={sliderRef} className="episodes-row">
          {
            episodesVisible &&
            episodes.map((episode) => (
              <div className="episode-container" key={episode.id}>
                <a href={`stream/serie/${id_serie}/season/${season}/episode/${episode.episode_number}`} className="episode-title media__img" >
                  <h4>Episode {episode.episode_number}: {episode.name}</h4>
                </a>
                <p className="episode-overview">{episode.overview}</p>
              </div>
            ))
          }
        </div>
      </Slider>
    </div>
  );
}

export default Episodes;
