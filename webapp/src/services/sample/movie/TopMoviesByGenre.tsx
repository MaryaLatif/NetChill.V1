import React, {useEffect, useState} from 'react';
import MovieApi, {Movie, TopMovies} from "../../../api/session/MovieApi";
import ApiHttpClient from "../../../api/ApiHttpClient";

const apiHttpClient = new ApiHttpClient();
const movieApi = new MovieApi(apiHttpClient);

function TopOfMoviesByGenre(genre: number) {
  const [movie, setMovie] = useState<TopMovies>()
  let movie: Movie[];
  movieApi.getTopOfMoviesByGenre(genre)
    .then((res) => {
      console.log(res);
      movie = res;
      //setMovie(res);
    })
    .catch((err) => console.log(err))
  console.log(movie);
  return (
    <div>

    </div>
  );
}

export default TopOfMoviesByGenre;
