import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';

type Trailer = {
  id: number,
  keys: TrailerKey[]
};
export type TrailerKey = {
  key: string
};

export default class StreamingApi {
  private baseUrl = '/stream';

  constructor(private readonly httpClient: ApiHttpClient) {
  }

  getTrailerById(movieId: number) {
    return this
      .httpClient
      .restRequest<TrailerKey>(HttpMethod.GET, `${this.baseUrl}/${movieId}`)
      .execute();
  }
}
