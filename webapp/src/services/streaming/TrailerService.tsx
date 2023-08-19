import { Logger } from 'simple-logging-system';
import TrailerApi from '../../api/streaming/TrailerApi';

const logger = new Logger('StreamingService');

export default class TrailerService {
  constructor(private readonly streamingApi: TrailerApi) {}

  getTrailerMovieById = (id: number) => this.streamingApi.getTrailerMovieById(id)
    .catch((error) => {
      logger.error('Error while fetching movie trailer', { movieId: id, err: error });
      throw error;
    });

  getTrailerBySerieId = (id: number) => this.streamingApi.getTrailerBySerieId(id)
    .catch((error) => {
      logger.error('Error while fetching tv show trailer', { movieId: id, err: error });
      throw error;
    });
}
