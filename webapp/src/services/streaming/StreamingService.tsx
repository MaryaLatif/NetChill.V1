import { Logger } from 'simple-logging-system';
import StreamingApi from '../../api/streaming/StreamingApi';

const logger = new Logger('StreamingService');

export default class StreamingService {
  constructor(private readonly streamingApi: StreamingApi) {}

  getMovieTrailerById = (id: number) => this.streamingApi.getMovieTrailerById(id)
    .catch((error) => {
      logger.error('Error while fetching movie trailer', { movieId: id, err: error });
      throw error;
    });

  getSerieTrailerById = (id: number) => this.streamingApi.getSerieTrailerById(id)
    .catch((error) => {
      logger.error('Error while fetching tv show trailer', { movieId: id, err: error });
      throw error;
    });
}
