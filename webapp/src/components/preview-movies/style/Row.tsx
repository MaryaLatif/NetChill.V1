import React, { useEffect, useState } from 'react';
import '../../../../public/assets/css/row.css';
import { Movie } from '../../../api/session/MoviePreviewApi';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import StreamingApi, { Trailer } from '../../../api/session/StreamingApi';
import ApiHttpClient from '../../../api/ApiHttpClient';
import ShowTrailer from './streaming/trailer/ShowTrailer';

const apiHttpClient = new ApiHttpClient();
const streamingApi = new StreamingApi(apiHttpClient);

function Row({
  title, movieList, isLargerRow,
}: { title: string, movieList: Movie[], isLargerRow?: boolean }) {
  const BASE_URL = 'https://image.tmdb.org/t/p/original/';
  const [trailer, setTrailer] = useState<Trailer>();
  const [movieInfo, setMovieInfo] = useState<{ id: number, overview: string, type: string }>();
  const [visible, setVisible] = useState(false);
  const movieLoader = useLoader();
  function handleClick(movieId: number, movieResume: string, type: string): void {
    setMovieInfo({ id: movieId, overview: movieResume, type });
    setVisible(true);
  }

  function handleRemoveComponent() {
    setVisible(false);
  }

  useEffect(() => {
    if (movieInfo) {
      if (movieInfo.type === 'movie') {
        movieLoader.monitor(streamingApi.getMovieTrailerById(movieInfo.id)
          .then((url) => {
            setTrailer(url);
          })
          .catch((err) => console.log(err)));
      } else {
        movieLoader.monitor(streamingApi.getSerieTrailerById(movieInfo.id)
          .then((url) => {
            setTrailer(url);
          })
          .catch((err) => console.log(err)));
      }
    }
  }, [movieInfo]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movieList.map((movie) => (
          <div key={movie.id} className={
            `row_poster ${isLargerRow && 'row_poster_large'}`
          }
               onClick={() => {
                 handleClick(movie.id, movie.overview, movie.name ? 'serie' : 'movie');
               }
               }>
            <img
              src={BASE_URL + (isLargerRow || !movie.backdrop_path ? movie.poster_path : movie.backdrop_path)}
              alt={movie.title}/>

            <h3 className={'title'}>{movie.title ? movie.title : movie.name}</h3>
          </div>
        ))}
      </div>
      {visible && trailer && movieInfo && <ShowTrailer
        url={trailer.key}
        overview={movieInfo.overview}
        onRemove={handleRemoveComponent}/>}
    </div>
  );
}

export default Row;
