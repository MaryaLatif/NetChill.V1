import React, { useEffect, useRef, useState } from 'react';
import '../../../../../assets/scss/components/style/row/row.scss';
import { getGlobalInstance } from 'plume-ts-di';
import classNames from 'classnames';
import Arrow from '../arrow/Arrow';
import { MediaType, Production, Trailer } from '../../../../api/types/MovieDbTypes';
import TrailerService from '../../../../services/streaming/TrailerService';
import useLoader from '../../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import RowLoading from '../../../general/loading/RowLoading';
import ShowTrailer from '../../../general/streaming/trailer/ShowTrailer';
import PosterBackground from '../poster/PosterBackground';
import Recommendation from '../recommendation/Recommendation';
import Slider from '../slider/Slider';

type Props = {
  title: string,
  movieList: Production[],
  isLargerRow?: boolean,
  topRated?: boolean,
  isDataLoading?: boolean
};

type MovieInfo = {
  id: number,
  overview: string,
  type: MediaType,
  genre_ids: number[]
};

// TODO [REFACTO-SCSS]
// TODO Couper ce composant en 2 sous-composant générique : MediaSlider, MediaTile
function Row({
  title, movieList, isLargerRow, topRated, isDataLoading,
}: Props) {
  const trailerService = getGlobalInstance(TrailerService);

  const [trailer, setTrailer] = useState<Trailer>();
  const [movieInfo, setMovieInfo] = useState<MovieInfo>();
  const [visible, setVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  const movieLoader = useLoader();

  function handleClick(index: number): void {
    const movie = movieList[index];
    setMovieInfo({
      id: movie.id,
      overview: movie.overview,
      type: movie.type,
      genre_ids: movie.genre_ids,
    });
    setVisible(true);
  }

  function handleCloseTrailerPopIn() {
    setVisible(false);
    setTrailer(undefined);
  }

  // TODO à revoir slider.current.scrollLeft
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

  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    sliderRef.current.scrollLeft = currentPosition * sliderRef.current.offsetWidth;
  }, [currentPosition]);

  useEffect(() => {
    if (!movieInfo) {
      return;
    }

    const apiCall = movieInfo.type === MediaType.MOVIE
      ? trailerService.getTrailerByMovieId
      : trailerService.getTrailerBySerieId;

    movieLoader.monitor(apiCall(movieInfo.id)
      .then(setTrailer));
  }, [movieInfo]);

  return (
    <div>
      <div className="row">
        <h2>{title}</h2>
        {
          isDataLoading
            ? (<RowLoading isLargerRow={isLargerRow} />)
            : (
              <div className="row__poster-container">
                <Slider
                  isArrowLeftVisible={currentPosition > 0}
                  isArrowRightVisible
                  onClickArrowRight={handleClickArrowRight}
                  onClickArrowLeft={handleClickArrowLeft} >
                    <div ref={sliderRef} className="row__posters">
                      {movieList.map((movie, index) => (
                        <div
                          key={movie.id}
                          className={classNames(
                            'poster',
                            { 'poster--large': isLargerRow },
                            { top_rated: topRated },
                          )}
                          onClick={() => handleClick(index)}
                          aria-hidden="true"
                        >
                          <PosterBackground
                            path={isLargerRow || !movie.backdrop_path ? movie.poster_path : movie.backdrop_path}
                            title={movie.title}
                            className={classNames('media__img', { 'media__img-deformed': !movie.backdrop_path })}
                          />
                          <div className="media__info">
                            <p className="media__title">{movie.title}</p>
                            < Recommendation average={movie.vote_average} />
                          </div>
                        </div>
                      ))}
                    </div>
                </Slider>
              </div>
            )
        }
      </div>
      {/* TODO [Click outside popin] */}
      {
        visible
        && trailer
        && movieInfo
        // eslint-disable-next-line jsx-a11y/click-events-have-key
        && (<div /* onClick={(event) => {
          let element = event.target;
          while (element.parentNode
            && (element.parentNode !== document.getElementsByClassName('show-movie'))) {
            element = element.parentNode;
          }
          if (element.parentNode !== document.getElementsByName('show-movie')) {
            handleCloseTrailerPopIn();
          }
        }} */>
            <ShowTrailer
              url={trailer.key}
              overview={movieInfo.overview}
              genreIds={movieInfo.genre_ids}
              onClose={handleCloseTrailerPopIn}
            />
          </div>
        )}
    </div>
  );
}

export default Row;
