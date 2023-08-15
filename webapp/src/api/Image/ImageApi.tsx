import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';

export default class ImageApi {
  private baseUrl: String = '/image';

  constructor(private readonly httpClient: ApiHttpClient) {}

  getImageBaseUrl() {
    return this
      .httpClient
      .restRequest<String>(HttpMethod.GET, `${this.baseUrl}/base-url`)
      .execute();
  }
}
