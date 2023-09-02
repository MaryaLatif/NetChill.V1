import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';
import { Trailer } from '../types/MovieDbTypes';

export default class TrailerApi {
  private baseUrl = '/trailers';

  constructor(private readonly httpClient: ApiHttpClient) {
  }

  getTrailerMovieById(id: number) {
    return this
      .httpClient
      .restRequest<Trailer>(HttpMethod.GET, `${this.baseUrl}/movies/movie-id`)
      .queryParams([['id', id]])
      .execute();
  }

  getTrailerBySerieId(id: number) {
    return this
      .httpClient
      .restRequest<Trailer>(HttpMethod.GET, `${this.baseUrl}/series/serie-id`)
      .queryParams([['id', id]])
      .execute();
  }
}
