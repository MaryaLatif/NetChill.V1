import React, {useEffect, useState} from 'react';
import MovieApi, {Movie} from '../../api/session/MovieApi';
import ApiHttpClient from '../../api/ApiHttpClient';

// eslint-disable-next-line @typescript-eslint/naming-convention
const base_url = 'https://image.tmdb.org/t/p/original/';

const apiHttpClient = new ApiHttpClient();
const movieApi = new MovieApi(apiHttpClient);

type Props = {
  title: string,
  id_genre: number,
  isLargerRow: boolean,
};

function MoviesByGenreService(children: Props) {
  const [movie, setMovie] = useState<Movie[]>();
  useEffect(() => {
    async function fetchData() {
      await movieApi.getTopOfMoviesByGenre(children.id_genre)
        .then((res) => {
          console.log(res);
          setMovie(res);
        })
        .catch((err) => console.log(err));
    }

    fetchData();
  }, [children.id_genre]);

  console.log(movie);
  return (
    <div className="row">
      <h2>{children.title}</h2>
      <div className="row_posters">
        {movie.map((movie) => (
          <div key={movie.id} className={`row_poster ${children.isLargerRow && 'row_poster_large'}`}>
            <img
              src={base_url + (children.isLargerRow ? movie.poster_path : movie.backdrop_path)}
              alt={movie.title}/>
            <h3 className={'title'}>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesByGenreService;
