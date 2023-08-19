import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';

export default class StreamApi {
  private baseUrl = '/stream';

  constructor(private readonly httpClient: ApiHttpClient) {}

  getMediaVideo() {
    return this
      .httpClient
      .restRequest<String>(HttpMethod.GET, `${this.baseUrl}/video/test`)
      .execute();
  }
}
