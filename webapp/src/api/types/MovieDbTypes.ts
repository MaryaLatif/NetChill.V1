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
