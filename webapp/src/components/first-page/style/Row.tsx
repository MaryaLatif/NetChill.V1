import React from 'react';
import '../../../../public/assets/css/row.css';
import { Movie } from "../../../api/session/MovieApi";

function Row({ title, movieList, isLargerRow }:{ title:string, movieList:Movie[], isLargerRow?: boolean}) {
  const BASE_URL = 'https://image.tmdb.org/t/p/original/';

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movieList.map((movie) => (
          <div key={movie.id} className={`row_poster ${isLargerRow && "row_poster_large"}`}>
            <img
              src={BASE_URL + (isLargerRow || !movie.backdrop_path? movie.poster_path: movie.backdrop_path)}
              alt={movie.title}/>
            <h3 className={'title'}>{movie.title? movie.title: movie.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
