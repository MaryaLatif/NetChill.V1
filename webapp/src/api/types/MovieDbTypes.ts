export type Configuration = {
  imageBaseUrl: string,
  connectionKey: string,
};

export type PaginatedResult<T> = {
  page: number,
  results: T[],
  total_page: number,
  total_results: number,
};

export type Production = {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  overview: string,
  poster_path: string,
  release_date: string,
  title: string,
  mediaType: MediaType,
  vote_average: number,
  number_of_seasons: number,
};

export type Serie = {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  overview: string,
  poster_path: string,
  first_air_date: string,
  name: string,
  vote_average: number,
  number_of_seasons: number,
};

export type SeasonEpisodes = {
  season_number: number,
  episodes: Episode[],
}

export type Episode = {
  id: number,
  episode_number: number,
  name: string,
  overview: string,
}

type Genre = {
  id: number,
  name: string
};

enum MediaType {
  MOVIE = 'MOVIE',
  SERIE = 'SERIE',
}

type Trailer = {
  key: string,
  type: MediaType
};

export type { Genre, Trailer };
export { MediaType };
