import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';

export type AllMovies = {
  page:number,
  results: Movie[],
  total_page: number,
  total_results: number,

};
export type Movie = {
  adult:boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  overview:string,
  poster_path: string,
  release_date?:string,
  title:string,
  video:boolean
}

export type TopMovies ={
  results: Movie[]
}

export default class MovieApi {

  private baseUrl = '/movies';
  constructor(private readonly httpClient: ApiHttpClient) {
  }

  getTopOfMoviesByGenre(genre: number) {
    return this
      .httpClient
      .restRequest<Movie[]>(HttpMethod.GET, `${this.baseUrl}/genre/${genre}`)
      .execute();
  }
  getNetflixOriginals(){
    return this
      .httpClient
      .restRequest<TopMovies>(HttpMethod.GET, `${this.baseUrl}/netflix-originals`)
      .execute();
  }

}
