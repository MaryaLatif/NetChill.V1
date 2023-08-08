import React, { useEffect, useRef, useState } from 'react';
import { Production } from '../../../../api/types/MovieDbTypes';
import RowLoading from '../../../general/loading/RowLoading';
import '../../../../../assets/scss/components/row.scss';
import '../../../../../assets/scss/components/arrow.scss';
import '../../../../../assets/scss/components/top-row.scss';
import Arrow from './Arrow';
import Poster from '../poster/Poster';

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

  function nextPosterRight() {
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

  function nextPosterLeft() {
    if (!slider.current) {
      return;
    }

    setCurrentPoster(currentPoster - 1);
    slider.current.scrollLeft -= window.innerWidth;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextPosterRight(); // Appeler directement la fonction pour déplacer le slider vers la droite
    }, 8000);

    setSliderInterval(interval);

    // Nettoyer l'intervalle lorsque le composant est démonté pour éviter les fuites de mémoire
    return () => {
      clearInterval(interval);
    };
  }, [movieList]);

  return (
    <div className='row-top'>
      {
        isDataLoading ? <RowLoading/>
          : <div ref={slider} className='row__posters row__posters--top'>
            {movieList.map((movie, index) => {
              const isSelected = currentPoster === index;
              return (
                <div key={movie.title}>
                  <Poster title={movie.title}
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
      }
      <div className='arrow__parent'>
        {
          currentPoster > 0
          && <Arrow orientation={'left'} onClick={() => {
            stopSliderInterval();
            nextPosterLeft();
          }}/>
        }
        {
          currentPoster < movieList.length - 1
          && <Arrow orientation={'right'} onClick={() => {
            stopSliderInterval();
            nextPosterRight();
          }}/>
        }
      </div>
    </div>
  );
}

export default TopRow;
