import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';
import { Genre } from '../types/MovieDbTypes';

export default class GenreApi {
  private BASE_URL : string = '/genres';

  constructor(private readonly httpClient: ApiHttpClient) {
  }

  getGenreById(id: number) {
    return this
      .httpClient
      .restRequest<Genre>(HttpMethod.GET, `${this.BASE_URL}/${id}`)
      .execute();
  }

  getPreviewGenre() {
    return this
      .httpClient
      .restRequest<Genre[]>(HttpMethod.GET, `${this.BASE_URL}/featured`)
      .execute();
  }
}
