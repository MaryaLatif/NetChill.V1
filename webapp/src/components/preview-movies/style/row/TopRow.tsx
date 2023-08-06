import React, { useEffect, useRef, useState } from 'react';
import { Production } from '../../../../api/types/MovieDbTypes';
import RowLoading from '../../../general/loading/RowLoading';
import '../../../../../assets/scss/components/row.scss';
import '../../../../../assets/scss/components/arrow.scss';
import '../../../../../assets/scss/components/top-row.scss';
import Player from '../../../general/streaming/movie/Player';
import Arrow from './Arrow';
import Poster from '../image/Poster';
import classNames from 'classnames';

type Props = {
  title?: string,
  movieList: Production[],
  isDataLoading?: boolean
};

function TopRow({ movieList, isDataLoading }: Props) {
  const slider = useRef<HTMLDivElement>(null);

  const [currentPoster, setCurrentPoster] = useState(0);
  const [sliderInterval, setSliderInterval] = useState<NodeJS.Timeout | null>(null);

  function stopSliderInterval() {
    if (!sliderInterval) {
      return;
    }
    return clearInterval(sliderInterval);
  }
  function hundleClickArrowRight() {
    setCurrentPoster((prevPoster) => {
      if (!slider.current) {
        return prevPoster;
      }

      if (prevPoster + 1 >= movieList.length) {
        slider.current.scrollLeft = 0;
        return 0;
      }
      slider.current.scrollLeft += window.innerWidth;

      return prevPoster + 1;
    });
  }

  function hundleClickArrowLeft() {
    if (!slider.current) {
      return;
    }

    setCurrentPoster(currentPoster - 1);
    slider.current.scrollLeft -= window.innerWidth;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      hundleClickArrowRight(); // Appeler directement la fonction pour déplacer le slider vers la droite
    }, 5000);

    setSliderInterval(interval);

    // Nettoyer l'intervalle lorsque le composant est démonté pour éviter les fuites de mémoire
    return () => {
      clearInterval(interval);
    };
  }, [movieList]);

  return (
    <div className={'top_row'}>
      {
        isDataLoading
          ? <RowLoading/>

          : <div ref={slider} className={'row_posters'} id={'top_posters'}>
            {movieList.map((movie, index) => {
              const isSelected = currentPoster === index;
              return (
                <div key={movie.title}>
                  <div
                    className={classNames('top_card', { 'top_card--selected': isSelected })}
                    style={{ width: `${window.innerWidth}px` }}
                  >
                    <div id={'info'}>
                      <h2>{movie.title}</h2>
                      <p>{movie.overview}</p>
                      <Player/>
                    </div>
                    <div className={'filter'}></div>
                    <Poster title={movie.title} path={movie.backdrop_path} className={'top_img'}/>
                  </div>
                </div>
              );
            })}
          </div>
      }
      <div className={'arrow_parent'}>
        {
          currentPoster > 0
          && <Arrow left onClick={() => {
            stopSliderInterval();
            hundleClickArrowLeft();
          }}/>
        }
        {
          currentPoster < movieList.length - 1
          && <Arrow right onClick={() => {
            stopSliderInterval();
            hundleClickArrowRight();
          }}/>
        }
      </div>
    </div>
  );
}

export default TopRow;
