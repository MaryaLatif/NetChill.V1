import React, { useEffect, useState } from 'react';
import '../../../../../assets/scss/components/row.scss';
import { getGlobalInstance } from 'plume-ts-di';
import classNames from 'classnames';
import top1 from '../../../../../assets/icons/top1.png';
import top2 from '../../../../../assets/icons/top2.png';
import top3 from '../../../../../assets/icons/top3.png';
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

  const movieLoader = useLoader();

  const top: any[] = [top1, top2, top3];

  let i = 0;

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
    const slider = document.getElementById(classType);
    slider.scrollLeft += window.innerWidth - 150;
  }

  function hundleClickArrowLeft() {
    const slider = document.getElementById(classType);
    slider.scrollLeft -= window.innerWidth - 150;
  }

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
              <div className={'row_posters'} id={classType}>
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
                    {topRated && i < 3 && (<img src={top[i]} alt={'top 1'} className={'top_rated_img'}/>)}
                    {i < 3 && <noscript>{i++}</noscript>}
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
            )
        }
        <div className={'arrow_parent'} style={{ height: '140px', bottom: '1rem' }}>
          <Arrow left={true} onClick={hundleClickArrowLeft}/>
          <Arrow right={true} onClick={hundleClickArrowRight}/>
        </div>
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
