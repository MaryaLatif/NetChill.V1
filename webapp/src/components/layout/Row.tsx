import React, {useState, useEffect, Children} from 'react';
import "../../../public/assets/css/row.css";
import MovieApi, {AllMovies, Movie, TopMovies} from "../../api/session/MovieApi";

const base_url = "https://image.tmdb.org/t/p/original/";

type Props = {
  title: string,
  fetchMovies: Movie[],
  isLargerRow: boolean,
}

function Row(children: Props) {

  return (
    <div className="row">
      <h2>{children.title}</h2>
      <div className="row_posters">
        {children.fetchMovies.map(movie => (
          <div key={movie.id} className={`row_poster ${children.isLargerRow && "row_poster_large"}`}>
            <img
              src={base_url + (children.isLargerRow ? movie.poster_path : movie.backdrop_path)}
              alt={movie.name}/>
            <h3 className={'title'}>{movie.name ? movie.name : movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Row
