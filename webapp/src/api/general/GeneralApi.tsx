import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';
import { Genre } from '../types/MovieDbTypes';

export default class GeneralApi {
  private baseUrl = '/stream';

  constructor(private readonly httpClient: ApiHttpClient) {
  }

  getGenreById(id: number) {
    return this
      .httpClient
      .restRequest<Genre>(HttpMethod.GET, `${this.baseUrl}/genre/${id}`)
      .execute();
  }
}
