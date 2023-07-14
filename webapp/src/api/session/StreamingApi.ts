import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';

export type Trailer = {
  key: string,
  type: string
};

export default class StreamingApi {
  private baseUrl = '/stream';

  constructor(private readonly httpClient: ApiHttpClient) {
  }

  getMovieTrailerById(id: number) {
    return this
      .httpClient
      .restRequest<Trailer>(HttpMethod.GET, `${this.baseUrl}/movie/${id}`)
      .execute();
  }

  getSerieTrailerById(id: number) {
    return this
      .httpClient
      .restRequest<Trailer>(HttpMethod.GET, `${this.baseUrl}/serie/${id}`)
      .execute();
  }
}
