import { Logger } from 'simple-logging-system';
import PreviewApi from '../../api/preview-movies/PreviewApi';

const logger = new Logger('PreviewMoviesService');
export default class PreviewMoviesService {
  constructor(private readonly previewApi: PreviewApi) {
  }

  getMoviesByGenre = (id: number) => this.previewApi.getTopOfMoviesByGenre(id)
    .catch((error) => {
      logger.error('Error', { id, err: error });
      throw error;
    });

  getNetflixOriginals = () => this.previewApi.getNetflixOriginals()
    .catch((error) => {
      logger.error('Error', error);
      throw error;
    });

  getTopRatedMovies = () => this.previewApi.getTopRatedMovies()
    .catch((error) => {
      logger.error('Error', error);
      throw error;
    });

  getTrendingMovies = () => this.previewApi.getTrendingMovies()
    .catch((error) => {
      logger.error('Error', error);
      throw error;
    });

  getPreviewGenres = () => this.previewApi.getPreviewGenre()
    .catch((error) => {
      logger.error('Error', error);
      throw error;
    });
}
