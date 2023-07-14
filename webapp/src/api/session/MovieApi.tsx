import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';

export type Genre = {
  id: number,
  name: string
};
export default class MovieApi {
  private baseUrl: string = '/movies';

  constructor(private readonly httpClient: ApiHttpClient) {
  }

  getGenreById(id: number) {
    return this
      .httpClient
      .restRequest<Genre>(HttpMethod.GET, `${this.baseUrl}/genre/${id}`)
      .execute();
  }
}
