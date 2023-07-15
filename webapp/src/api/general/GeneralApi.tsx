import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';
import { Genre } from '../types/MovieDbTypes';

export default class GeneralApi {
  constructor(private readonly httpClient: ApiHttpClient) {
  }

  getGenreById(id: number) {
    return this
      .httpClient
      .restRequest<Genre>(HttpMethod.GET, `/genre/${id}`)
      .execute();
  }
}
