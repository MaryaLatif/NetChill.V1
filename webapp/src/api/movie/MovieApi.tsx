import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';
import { Production } from '../types/MovieDbTypes';

export default class MovieApi {
  private baseUrl: string = '/movies';

  constructor(private readonly httpClient: ApiHttpClient) {
  }

  getTopOfMoviesByGenre(genre: number) {
    return this
      .httpClient
      .restRequest<Production[]>(HttpMethod.GET, `${this.baseUrl}/genre?genre=${genre}`)
      .execute();
  }

  getTopRatedMovies() {
    return this
      .httpClient
      .restRequest<Production[]>(HttpMethod.GET, `${this.baseUrl}/top-rated`)
      .execute();
  }
}
