import { Logger } from 'simple-logging-system';
import GlobalApi from '../../api/global/GlobalApi';

const logger = new Logger('PreviewMoviesService');
export default class GlobalService {
  constructor(private readonly previewApi: GlobalApi) {
  }

  getTrendingMovies = () => this.previewApi.getTrendingMovies()
    .catch((error) => {
      logger.error('Error', error);
      throw error;
    });
}
