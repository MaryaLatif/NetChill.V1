export type AllMovies = {
  page: number,
  results: Movie[],
  total_page: number,
  total_results: number,
};

export type Movie = {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  overview: string,
  poster_path: string,
  release_date: string,
  title?: string,
  name?: string,
  vote_average: number,
  media_type: string
};

export type NetflixMovie = {
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  overview: string,
  poster_path: string,
  first_air_date: string,
  name: string,
  vote_average: number,
};

export type AllNetflixMovies = {
  page: number,
  results: NetflixMovie[],
  total_page: number,
  total_results: number,
};

type Genre = {
  id: number,
  name: string
};

enum MediaType {
  MOVIE = 'movie',
  SERIE = 'serie',
}

type Trailer = {
  key: string,
  type: MediaType
};

export type { Genre, Trailer };
export { MediaType };
