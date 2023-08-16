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
  type: MediaType,
  vote_average: number,
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
