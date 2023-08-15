import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';
import { Production } from '../types/MovieDbTypes';

export default class GlobalApi {
  private baseUrl = '/movies-preview';

  constructor(private readonly httpClient: ApiHttpClient) {
  }

  getTrendingMovies() {
    return this
      .httpClient
      .restRequest<Production[]>(HttpMethod.GET, `${this.baseUrl}/trending`)
      .execute();
  }
}
