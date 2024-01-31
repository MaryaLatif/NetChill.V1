import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';
import { Episode, Production, Serie } from '../types/MovieDbTypes';

export default class SerieApi {
  private baseUrl: string = '/series';

  constructor(private readonly httpClient: ApiHttpClient) {
  }

  getNetflixOriginals() {
    return this
      .httpClient
      .restRequest<Production[]>(HttpMethod.GET, `${this.baseUrl}/netflix-originals`)
      .execute();
  }

  getSerieById(id: number) {
    return this
      .httpClient
      .restRequest<Production>(HttpMethod.GET, `${this.baseUrl}/${id}`)
      .execute();
  }

  getForYou() {
    return this
      .httpClient
      .restRequest<Production[]>(HttpMethod.GET, `${this.baseUrl}/for-you`)
      .execute();
  }

  getEpisodes(id: number, season: number) {
    return this
      .httpClient
      .restRequest<Episode[]>(HttpMethod.GET, `${this.baseUrl}/${id}/episodes`)
      .queryParams([['season', season]])
      .execute();
  }

  getSeasonAvailable(id: number) {
    return this
      .httpClient
      .restRequest<number[]>(HttpMethod.GET, `${this.baseUrl}/${id}/seasons-availables`)
      .execute();
  }
}
