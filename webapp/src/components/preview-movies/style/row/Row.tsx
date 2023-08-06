import React, { useEffect, useRef, useState } from 'react';
import '../../../../../assets/scss/components/row.scss';
import { getGlobalInstance } from 'plume-ts-di';
import classNames from 'classnames';
import Arrow from './Arrow';
import { MediaType, Production, Trailer } from '../../../../api/types/MovieDbTypes';
import TrailerService from '../../../../services/streaming/TrailerService';
import useLoader from '../../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import RowLoading from '../../../general/loading/RowLoading';
import ShowTrailer from '../../../general/streaming/trailer/ShowTrailer';
import Poster from '../image/Poster';
import Recommendation from '../recommendation/Recommendation';

type Props = {
  title: string,
  movieList: Production[],
  isLargerRow?: boolean,
  topRated?: boolean,
  isDataLoading?: boolean
  classType: string
};

type MovieInfo = {
  id: number,
  overview: string,
  type: MediaType,
  genreIds: number[]
};

function Row({
  title, movieList, isLargerRow, topRated, isDataLoading, classType,
}: Props) {
  const streamingService = getGlobalInstance(TrailerService);

  const [trailer, setTrailer] = useState<Trailer>();
  const [movieInfo, setMovieInfo] = useState<MovieInfo>();
  const [visible, setVisible] = useState(false);
  const [currentSliderLeft, setCurrentSliderLeft] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  const slider = useRef<HTMLDivElement>(null);

  const movieLoader = useLoader();

  function handleClick(movieId: number, movieResume: string, type: MediaType, genreIds: number[]): void {
    setMovieInfo({
      id: movieId,
      overview: movieResume,
      type,
      genreIds,
    });
    setVisible(true);
  }

  function handleCloseTrailerPopIn() {
    setVisible(false);
    setTrailer(undefined);
  }

  function hundleClickArrowRight() {
    if (!slider.current) {
      return;
    }
    slider.current.scrollLeft += window.innerWidth - 150;
  }

  function hundleClickArrowLeft() {
    if (!slider.current) {
      return;
    }
    slider.current.scrollLeft -= window.innerWidth - 150;
  }

  useEffect(() => {
    if (!slider.current) {
      return;
    }
    setCurrentSliderLeft(slider.current.scrollLeft);
    setSliderWidth(slider.current.scrollWidth);
  }, [slider.current?.scrollLeft]);

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
              <div className={'row_poster_parent'}>
                <div ref={slider} className={'row_posters'} id={classType}>
                  {movieList.map((movie) => (
                    <div
                      key={movie.id}
                      className={classNames(
                        'row_poster',
                        { row_poster_large: isLargerRow },
                        { top_rated: topRated },
                        `${classType}`,
                      )}
                      onClick={() => handleClick(
                        movie.id,
                        movie.overview,
                        movie.type,
                        movie.genre_ids,
                      )}
                      aria-hidden="true"
                    >
                      <Poster
                        path={isLargerRow || !movie.backdrop_path ? movie.poster_path : movie.backdrop_path}
                        title={movie.title}
                        className={'row_img'}
                      />
                      <div className={'info'}>
                        <h3 className={'title'}>{movie.title ? movie.title : movie.title}</h3>
                        < Recommendation average={movie.vote_average}/>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={'arrow_parent'} style={{ height: '140px' }}>
                  {
                    currentSliderLeft > 0
                    && <Arrow left={true} onClick={hundleClickArrowLeft}/>
                  }
                  {
                    sliderWidth - currentSliderLeft > window.innerWidth
                    && <Arrow right={true} onClick={hundleClickArrowRight}/>
                  }
                </div>
              </div>
            )
        }
      </div>
      {
        visible
        && trailer
        && movieInfo
        && (<div onClick={(event) => {
          let element = event.target;
          while (element.parentNode
            && (element.parentNode !== document.getElementById('show-movie'))) {
            element = element.parentNode;
          }
          if (element.parentNode !== document.getElementById('show-movie')) {
            handleCloseTrailerPopIn();
          }
        }}>
            <ShowTrailer
              url={trailer.key}
              overview={movieInfo.overview}
              genreIds={movieInfo.genreIds}
              onClose={handleCloseTrailerPopIn}
            />
          </div>
        )}
    </div>
  );
}

export default Row;
