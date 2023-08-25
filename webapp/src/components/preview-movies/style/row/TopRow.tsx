import React, { useEffect, useRef, useState } from 'react';
import { Production } from '../../../../api/types/MovieDbTypes';
import RowLoading from '../../../general/loading/RowLoading';
import '../../../../../assets/scss/components/style/row/row.scss';
import '../../../../../assets/scss/components/style/arrow/arrow.scss';
import '../../../../../assets/scss/components/style/row/top-row.scss';
import Arrow from '../arrow/Arrow';
import Poster from '../poster/Poster';

type Props = {
  title?: string,
  movieList: Production[],
  isDataLoading?: boolean
};

const SLIDER_TIMING: number = 5_000;

function TopRow({ movieList, isDataLoading }: Props) {
  const slider = useRef<HTMLDivElement>(null);
  const sliderInterval = useRef<NodeJS.Timeout>();
  const [currentPoster, setCurrentPoster] = useState(0);

  function createSliderInterval() {
    if (sliderInterval.current) {
      stopSliderInterval();
    }

    sliderInterval.current = setInterval(() => goNextPoster(), SLIDER_TIMING);
  }

  function stopSliderInterval() {
    if (!sliderInterval?.current) {
      return;
    }

    return clearInterval(sliderInterval.current);
  }

  function goNextPoster() {
    setCurrentPoster((prevPoster) => {
      if (!slider.current) {
        return prevPoster;
      }

      stopSliderInterval();

      if (prevPoster + 1 >= movieList.length) {
        slider.current.scrollLeft = 0;
        return 0;
      }
      slider.current.scrollLeft += window.innerWidth;
      createSliderInterval();

      return prevPoster + 1;
    });
  }

  function goPreviousPoster() {
    if (!slider.current) {
      return;
    }

    stopSliderInterval();

    setCurrentPoster(currentPoster - 1);
    slider.current.scrollLeft -= window.innerWidth;

    createSliderInterval();
  }

  useEffect(() => {
    createSliderInterval();

    // Nettoyer l'intervalle lorsque le composant est démonté pour éviter les fuites de mémoire
    return stopSliderInterval;
  }, [movieList]);

  return (
    <div className='row-top'>
      {
        isDataLoading ? <RowLoading/>
          : (
            <div ref={slider} className='row__posters row__posters--top'>
              {movieList.map((movie, index) => {
                const isSelected = currentPoster === index;
                return (
                  <div key={movie.id}>
                    <Poster
                      title={movie.title}
                      overview={movie.overview}
                      id={movie.id}
                      type={movie.type}
                      backdrop_path={movie.backdrop_path}
                      isSelected={isSelected}
                      stopInterval={stopSliderInterval}
                    />
                  </div>
                );
              })}
            </div>
          )
      }

      {/* TODO créer un composant SLIDER */}
      <div className='navigation__container'>
        {
          currentPoster > 0
          && <Arrow orientation={'left'} onClick={goPreviousPoster}/>
        }
        {
          currentPoster < movieList.length - 1
          && <Arrow orientation={'right'} onClick={goNextPoster}/>
        }
      </div>
    </div>
  );
}

export default TopRow;
