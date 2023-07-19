import ApiHttpClient from '../ApiHttpClient';

export default class MovieApi {
  private baseUrl: string = '/stream';

  constructor(private readonly httpClient: ApiHttpClient) {
  }
}
