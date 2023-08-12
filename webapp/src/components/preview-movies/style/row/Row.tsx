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
  const streamingService = getGlobalInstance(TrailerService);

  const [trailer, setTrailer] = useState<Trailer>();
  const [movieInfo, setMovieInfo] = useState<MovieInfo>();
  const [visible, setVisible] = useState(false);
  const [currentSliderLeft, setCurrentSliderLeft] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  const movieLoader = useLoader();

  function handleClick({
    id, overview, type, genre_ids,
  }: Production): void {
    setMovieInfo({
      id,
      overview,
      type,
      genre_ids,
    });
    setVisible(true);
  }

  function handleCloseTrailerPopIn() {
    setVisible(false);
    setTrailer(undefined);
  }

  // TODO à revoir slider.current.scrollLeft
  function handleClickArrowRight() {
    if (!sliderRef.current) {
      return;
    }
    sliderRef.current.scrollLeft += window.innerWidth - 150;
  }

  function handleClickArrowLeft() {
    if (!sliderRef.current) {
      return;
    }
    sliderRef.current.scrollLeft -= window.innerWidth - 150;
  }

  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }
    setCurrentSliderLeft(sliderRef.current.scrollLeft);
    setSliderWidth(sliderRef.current.scrollWidth);
  }, [sliderRef.current?.scrollLeft]);

  useEffect(() => {
    if (!movieInfo) {
      return;
    }

    const apiCall = movieInfo.type === MediaType.MOVIE
      ? streamingService.getMovieTrailerById
      : streamingService.getSerieTrailerById;

    movieLoader.monitor(apiCall(movieInfo.id)
      .then(setTrailer));
  }, [movieInfo]);

  return (
    <div>
      <div className="row">
        <h2>{title}</h2>
        {
          isDataLoading
            ? (<RowLoading isLargerRow={isLargerRow}/>)
            : (
              <div className='row__poster-container'>
                <div ref={sliderRef} className='row__posters'>
                  {movieList.map((movie) => (
                    <div
                      key={movie.id}
                      className={classNames(
                        'poster',
                        { 'poster--large': isLargerRow },
                        { top_rated: topRated },
                        `${classType}`,
                      )}
                      onClick={() => handleClick(movie)}
                      aria-hidden="true"
                    >
                      <PosterBackground
                        path={isLargerRow || !movie.backdrop_path ? movie.poster_path : movie.backdrop_path}
                        title={movie.title}
                        className='poster__img'
                      />
                      <div className='poster__info'>
                        <h3 className='poster__title'>{movie.title ? movie.title : movie.title}</h3>
                        < Recommendation average={movie.vote_average}/>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='navigation__container' style={{ height: '140px' }}>
                  {
                    currentSliderLeft > 0
                    && <Arrow orientation='left' onClick={handleClickArrowLeft}/>
                  }
                  {
                    sliderWidth - currentSliderLeft > window.innerWidth
                    && <Arrow orientation='right' onClick={handleClickArrowRight}/>
                  }
                </div>
              </div>
            )
        }
      </div>
      // TODO [Click outside popin]
      {
        visible
        && trailer
        && movieInfo
        && (<div onClick={(event) => {
          let element = event.target;
          while (element.parentNode
            && (element.parentNode !== document.getElementsByClassName('show-movie'))) {
            element = element.parentNode;
          }
          if (element.parentNode !== document.getElementsByName('show-movie')) {
            handleCloseTrailerPopIn();
          }
        }}>
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
