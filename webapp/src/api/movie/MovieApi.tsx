import ApiHttpClient from '../ApiHttpClient';

export default class MovieApi {
  private baseUrl: string = '/movie';

  constructor(private readonly httpClient: ApiHttpClient) {
  }
}
