import React, { useState } from 'react';
import '../../../../public/assets/css/row.css';
import YouTube from 'react-youtube';
import { Movie } from '../../../api/session/MovieApi';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import StreamingApi from '../../../api/session/StreamingApi';
import ApiHttpClient from '../../../api/ApiHttpClient';

const apiHttpClient = new ApiHttpClient();
const streamingApi = new StreamingApi(apiHttpClient);
function Row({
  title, movieList, isLargerRow,
}: { title: string, movieList: Movie[], isLargerRow?: boolean }) {
  const BASE_URL = 'https://image.tmdb.org/t/p/original/';
  const [trailerUrl, setTrailerUrl] = useState('');
  const movieLoader = useLoader();
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  function handleClick(movieId: number): void {
    if (trailerUrl) setTrailerUrl('');

    else {
      movieLoader.monitor(streamingApi.getTrailerById(movieId)
        .then((url) => setTrailerUrl(url.key))
        .catch((err) => console.log(err)));
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movieList.map((movie) => (
          <div key={movie.id} className={`row_poster ${isLargerRow && 'row_poster_large'}`}
               onClick={() => handleClick(movie.id)}>
            <img
              src={BASE_URL + (isLargerRow || !movie.backdrop_path ? movie.poster_path : movie.backdrop_path)}
              alt={movie.title}/>
            <h3 className={'title'}>{movie.title ? movie.title : movie.name}</h3>
          </div>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
}

export default Row;
