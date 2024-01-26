import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';
import { Production, Serie } from '../types/MovieDbTypes';

export default class SerieApi {
  private baseUrl: string = '/series';

  constructor(private readonly httpClient: ApiHttpClient) {
  }

  getNetflixOriginals() {
    return this
      .httpClient
      .restRequest<Production[]>(HttpMethod.GET, `${this.baseUrl}/netflix-originals`)
      .execute();
  }

  getSerieById(id: number) {
    return this
      .httpClient
      .restRequest<Serie>(HttpMethod.GET, `${this.baseUrl}/${id}`)
      .execute();
  }

  getForYou() {
    return this
      .httpClient
      .restRequest<Production[]>(HttpMethod.GET, `${this.baseUrl}/for-you`)
      .execute();
  }
}
