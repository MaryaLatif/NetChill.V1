import { Logger } from 'simple-logging-system';
import MovieApi from '../../api/movie/MovieApi';

const logger: Logger = new Logger('MovieService');

export default class MovieService {
  constructor(private readonly movieApi: MovieApi) {
  }

  getMoviesByGenre = (id: number) => this.movieApi.getTopOfMoviesByGenre(id)
    .catch((error) => {
      logger.error('Error', { id, err: error });
      throw error;
    });

  getTopRatedMovies = () => this.movieApi.getTopRatedMovies()
    .catch((error) => {
      logger.error('Error', error);
      throw error;
    });
}
