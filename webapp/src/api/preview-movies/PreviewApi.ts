import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';
import { Genre, Movie } from '../types/MovieDbTypes';

export default class PreviewApi {
  private baseUrl = '/movies-preview';

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

  getPreviewGenre() {
    return this
      .httpClient
      .restRequest<Genre[]>(HttpMethod.GET, `${this.baseUrl}/list-genres`)
      .execute();
  }
}
