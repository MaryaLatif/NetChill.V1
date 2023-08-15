import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';
import { Production } from '../types/MovieDbTypes';

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
}
