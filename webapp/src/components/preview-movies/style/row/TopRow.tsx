import React, { useEffect, useRef, useState } from 'react';
import MediaQuery from 'react-responsive';
import { Production } from '../../../../api/types/MovieDbTypes';
import useIntersectionObserver from '../../../../lib/hooks/IntersectionObserver';
import useInterval from '../../../../lib/hooks/Interval';
import { useOnDependenciesChange } from '../../../../lib/react-hooks-alias/ReactHooksAlias';
import '../../../../../assets/scss/components/style/row/row.scss';
import '../../../../../assets/scss/components/style/arrow/arrow.scss';
import '../../../../../assets/scss/components/style/row/top-row.scss';
import RowTopLoading from '../../../general/loading/RowTopLoading';
import Poster from '../poster/Poster';
import Slider from '../slider/Slider';

type Props = {
  title?: string,
  movieList: Production[],
  isDataLoading?: boolean
};

const SLIDER_TIMING: number = 5_000;

function TopRow({ movieList, isDataLoading }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { createInterval, stopInterval, resetInterval } = useInterval();
  const [currentPoster, setCurrentPoster] = useState(0);
  const isSliderVisible = useIntersectionObserver(sliderRef);

  function goNextPoster() {
    setCurrentPoster((prevPoster: number) => {
      if (!sliderRef.current) {
        return prevPoster;
      }

      resetInterval();

      if (prevPoster + 1 >= movieList.length) {
        return 0;
      }

      return prevPoster + 1;
    });
  }

  function goPreviousPoster() {
    if (!sliderRef.current) {
      return;
    }

    setCurrentPoster(currentPoster - 1);

    resetInterval();
  }

  useOnDependenciesChange(() => {
    createInterval(goNextPoster, SLIDER_TIMING);
  }, [movieList]);

  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    const firstChild = sliderRef.current.firstChild as HTMLElement | null;

    sliderRef.current.scrollLeft = currentPoster * (firstChild?.offsetWidth ?? 0);
  }, [currentPoster]);

  return (
    <div className="row-top">
      {
        isDataLoading ? <RowTopLoading />
          : (
            <>
              <Slider
                isArrowLeftVisible={currentPoster > 0}
                isArrowRightVisible={currentPoster < movieList.length - 1}
                onClickArrowRight={goNextPoster}
                onClickArrowLeft={goPreviousPoster}
              >
                <div ref={sliderRef} className="row__posters row__posters--top">
                  {movieList.map((movie, index) => {
                    const isSelected = currentPoster === index;

                    return (
                      <div key={movie.id}>
                        <MediaQuery maxWidth={767}>
                          <Poster
                            title={movie.title}
                            overview={movie.overview}
                            id={movie.id}
                            type={movie.type}
                            backdrop_path={movie.poster_path}
                            isSelected={isSelected}
                            isVisible={isSliderVisible}
                            onStartTrailer={stopInterval}
                          />
                        </MediaQuery>
                        <MediaQuery minWidth={767}>
                          <Poster
                            title={movie.title}
                            overview={movie.overview}
                            id={movie.id}
                            type={movie.type}
                            backdrop_path={movie.backdrop_path}
                            isSelected={isSelected}
                            isVisible={isSliderVisible}
                            onStartTrailer={stopInterval}
                          />
                        </MediaQuery>
                      </div>
                    );
                  })}
                </div>
              </Slider>
            </>
          )
      }
    </div>
  );
}

export default TopRow;
