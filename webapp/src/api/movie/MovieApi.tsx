import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';
import { Production } from '../types/MovieDbTypes';

export default class MovieApi {
  private baseUrl: string = '/movies';

  constructor(private readonly httpClient: ApiHttpClient) {
  }

  getTopRatedByGenre(genre: number) {
    return this
      .httpClient
      .restRequest<Production[]>(HttpMethod.GET, `${this.baseUrl}/top-rated/genre`)
      .queryParams([['genre', genre]])
      .execute();
  }

  getTopRated() {
    return this
      .httpClient
      .restRequest<Production[]>(HttpMethod.GET, `${this.baseUrl}/top-rated`)
      .execute();
  }
}
