import React, { useEffect, useState } from 'react';
import '../../../../public/assets/css/row.css';
import { getGlobalInstance } from 'plume-ts-di';
import classNames from 'classnames';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import ShowTrailer from './streaming/trailer/ShowTrailer';
import StreamingService from '../../../services/streaming/StreamingService';
import { MediaType, Trailer } from '../../../api/types/MovieDbTypes';
import { Movie } from '../../../api/preview-movies/PreviewApi';
import RowLoading from './loading/RowLoading';

type Props = {
  title: string,
  movieList: Movie[],
  isLargerRow?: boolean,
  isDataLoading?: boolean
};

type MovieInfo = {
  id: number,
  overview: string,
  type: MediaType,
  genreIds: number[]
};

function Row({
  title, movieList, isLargerRow, isDataLoading,
}: Props) {
  const streamingService = getGlobalInstance(StreamingService);

  const [trailer, setTrailer] = useState<Trailer>();
  const [movieInfo, setMovieInfo] = useState<MovieInfo>();
  const [visible, setVisible] = useState(false);

  const movieLoader = useLoader();

  const BASE_URL = 'https://image.tmdb.org/t/p/original/';

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
                  className={classNames('row_poster', { row_poster_large: isLargerRow })}
                  onClick={() => handleClick(
                    movie.id,
                    movie.overview,
                    movie.name ? MediaType.SERIE : MediaType.MOVIE,
                    movie.genre_ids,
                  )}
                  aria-hidden="true"
                >
                  <img
                    src={BASE_URL + (isLargerRow || !movie.backdrop_path ? movie.poster_path : movie.backdrop_path)}
                    alt={movie.title}/>

                  <h3 className={'title'}>{movie.title ? movie.title : movie.name}</h3>
                </div>
              ))}
            </div>
          )
      }
      {
        visible
        && trailer
        && movieInfo
        && (
          <ShowTrailer
            url={trailer.key}
            overview={movieInfo.overview}
            genreIds={movieInfo.genreIds}
            onClose={handleCloseTrailerPopIn}
          />
        )}
    </div>
  );
}

export default Row;
