import { Logger } from 'simple-logging-system';
import MovieApi from '../../api/movie/MovieApi';

const logger: Logger = new Logger('MovieService');

export default class MovieService {
  constructor(private readonly movieApi: MovieApi) {
  }

  getTopRatedByGenre = (id: number) => this.movieApi.getTopRatedByGenre(id)
    .catch((error) => {
      logger.error('Failed to fetch movies for genre with id: {} ', id, { error });
      throw error;
    });

  getTopRatedMovies = () => this.movieApi.getTopRatedMovies()
    .catch((error) => {
      logger.error('Failed to fetch top rated movies: {} ', { error });
      throw error;
    });
}
