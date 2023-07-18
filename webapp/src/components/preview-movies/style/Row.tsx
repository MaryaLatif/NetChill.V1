import React, { useEffect, useState } from 'react';
import '../../../../public/assets/css/row.css';
import { getGlobalInstance } from 'plume-ts-di';
import classNames from 'classnames';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import ShowTrailer from './streaming/trailer/ShowTrailer';
import StreamingService from '../../../services/streaming/StreamingService';
import { MediaType, Movie, Trailer } from '../../../api/types/MovieDbTypes';
import RowLoading from './loading/RowLoading';
import top1 from '../../../../assets/icons/top1.png';
import top2 from '../../../../assets/icons/top2.png';
import top3 from '../../../../assets/icons/top3.png';

type Props = {
  title: string,
  movieList: Movie[],
  isLargerRow?: boolean,
  topRated?: boolean,
  isDataLoading?: boolean
};

type MovieInfo = {
  id: number,
  overview: string,
  type: MediaType,
  genreIds: number[]
};

function Row({
  title, movieList, isLargerRow, topRated, isDataLoading,
}: Props) {
  const streamingService = getGlobalInstance(StreamingService);

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

  useEffect(() => {
    if (!movieInfo) {
      return;
    }

    const apiCall = movieInfo.type === 'movie'
      ? streamingService.getMovieTrailerById
      : streamingService.getSerieTrailerById;

    movieLoader.monitor(apiCall(movieInfo.id)
      .then(setTrailer));
  }, [movieInfo]);

  return (
    <div className="row">
      <h2>{title}</h2>
      {
        isDataLoading
          ? (<RowLoading isLargerRow={isLargerRow}/>)
          : (
            <div className="row_posters">
              {movieList.map((movie) => (
                <div
                  key={movie.id}
                  className={classNames('row_poster', { row_poster_large: isLargerRow }, { top_rated: topRated })}
                  onClick={() => handleClick(
                    movie.id,
                    movie.overview,
                    movie.name ? MediaType.SERIE : MediaType.MOVIE,
                    movie.genre_ids,
                  )}
                  aria-hidden="true"
                >
                  {topRated && i < 3 && (<img src={top[i]} alt={'top 1'} className={'top_rated_img'}/>)}
                  {i < 3 && <noscript>{i++}</noscript>}
                  <img
                      src={(isLargerRow || !movie.backdrop_path ? movie.poster_path : movie.backdrop_path)}
                      alt={movie.title}/>
                  <div className={'info'}>
                    <h3 className={'title'}>{movie.title ? movie.title : movie.name}</h3>
                    <p>Recommendation : {movie.vote_average}%</p>
                  </div>
                </div>
              ))}
            </div>
          )
      }
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
