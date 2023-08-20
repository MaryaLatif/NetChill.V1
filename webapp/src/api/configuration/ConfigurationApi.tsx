import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';
import { Configuration } from '../types/MovieDbTypes';

export default class ConfigurationApi {
  private baseUrl: string = '/configuration';

  constructor(private readonly httpClient: ApiHttpClient) {}

  getConfiguration() {
    return this
      .httpClient
      .restRequest<Configuration>(HttpMethod.GET, this.baseUrl)
      .execute();
  }
}
