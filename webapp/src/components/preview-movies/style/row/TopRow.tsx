import React, { useEffect, useRef, useState } from 'react';
import MediaQuery from 'react-responsive';
import { MediaType, MovieInfo, Production } from '../../../../api/types/MovieDbTypes';
import useIntersectionObserver from '../../../../lib/hooks/IntersectionObserver';
import useInterval from '../../../../lib/hooks/Interval';
import { useOnDependenciesChange } from '../../../../lib/react-hooks-alias/ReactHooksAlias';
import '../../../../../assets/scss/components/style/row/row.scss';
import '../../../../../assets/scss/components/style/arrow/arrow.scss';
import '../../../../../assets/scss/components/style/row/top-row.scss';
import RowTopLoading from '../../../general/loading/RowTopLoading';
import EpisodesPopin from '../../../general/streaming/trailer/EpisodesPopin';
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
  const [mediaInfo, setMediaInfo] = useState<MovieInfo>();
  const [currentPoster, setCurrentPoster] = useState(0);
  const [episodesVisible, setEpisodesVisible] = useState(false);
  const isSliderVisible = useIntersectionObserver(sliderRef);

  function onClickPlayer(event: React.MouseEvent<Element, MouseEvent>, index: number) {
    event.stopPropagation();
    stopInterval();
    const movie = movieList[index];
    setMediaInfo({
      id: movie.id,
      overview: movie.overview,
      mediaType: movie.mediaType,
      genre_ids: movie.genre_ids,
    });
    setEpisodesVisible(true);
  }

  function onClose(event: React.MouseEvent<Element, MouseEvent>) {
    event.stopPropagation();
    setEpisodesVisible(false);
  }

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
            <div>
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
                            genre_ids={movie.genre_ids}
                            type={movie.mediaType}
                            backdrop_path={movie.poster_path}
                            isSelected={isSelected}
                            isVisible={isSliderVisible}
                            onClickButton={(event) => {
                              onClickPlayer(event, index);
                            }}
                          />
                        </MediaQuery>
                        <MediaQuery minWidth={767}>
                          <Poster
                            title={movie.title}
                            overview={movie.overview}
                            id={movie.id}
                            genre_ids={movie.genre_ids}
                            type={movie.mediaType}
                            backdrop_path={movie.backdrop_path}
                            isSelected={isSelected}
                            isVisible={isSliderVisible}
                            onClickButton={(event) => {
                              onClickPlayer(event, index);
                            }}
                          />
                        </MediaQuery>
                      </div>
                    );
                  })}
                </div>
              </Slider>
            </div>
          )
      }
      <div>
        {
          episodesVisible && mediaInfo &&
          <EpisodesPopin mediaId={mediaInfo.id} mediaType={MediaType.SERIE} overview={mediaInfo.overview}
                         genreIds={mediaInfo.genre_ids} onClose={onClose} />
        }
      </div>

    </div>
  );
}

export default TopRow;
