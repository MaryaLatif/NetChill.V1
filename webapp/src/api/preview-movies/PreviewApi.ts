import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';
import { Genre, Production } from '../types/MovieDbTypes';

export default class PreviewApi {
  private baseUrl = '/movies-preview';

  constructor(private readonly httpClient: ApiHttpClient) {
  }

  getTopOfMoviesByGenre(genre: number) {
    return this
      .httpClient
      .restRequest<Production[]>(HttpMethod.GET, `${this.baseUrl}/genre?genre=${genre}`)
      .execute();
  }

  getNetflixOriginals() {
    return this
      .httpClient
      .restRequest<Production[]>(HttpMethod.GET, `${this.baseUrl}/netflix-originals`)
      .execute();
  }

  getTrendingMovies() {
    return this
      .httpClient
      .restRequest<Production[]>(HttpMethod.GET, `${this.baseUrl}/trending`)
      .execute();
  }

  getTopRatedMovies() {
    return this
      .httpClient
      .restRequest<Production[]>(HttpMethod.GET, `${this.baseUrl}/top-rated`)
      .execute();
  }
}
