import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';

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
};
export type AllNetflixMovies = {
  page: number,
  results: NetflixMovie[],
  total_page: number,
  total_results: number,
};

export default class MovieApi {
  private baseUrl = '/movies';

  constructor(private readonly httpClient: ApiHttpClient) {
  }

  getTopOfMoviesByGenre(genre: number) {
    return this
      .httpClient
      .restRequest<Movie[]>(HttpMethod.GET, `${this.baseUrl}/genre/${genre}`)
      .execute();
  }

  getNetflixOriginals() {
    return this
      .httpClient
      .restRequest<Movie[]>(HttpMethod.GET, `${this.baseUrl}/netflix-originals`)
      .execute();
  }

  getTrendingMovies() {
    return this
      .httpClient
      .restRequest<Movie[]>(HttpMethod.GET, `${this.baseUrl}/trending`)
      .execute();
  }

  getTopRatedMovies() {
    return this
      .httpClient
      .restRequest<Movie[]>(HttpMethod.GET, `${this.baseUrl}/top-rated`)
      .execute();
  }
}
