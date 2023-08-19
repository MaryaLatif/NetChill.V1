import { Logger } from 'simple-logging-system';
import StreamApi from '../../api/streaming/StreamApi';

const logger = new Logger('StreamService');
export default class StreamService {
  constructor(private readonly streamApi: StreamApi) {}

  getMediaVideo = () => this.streamApi.getMediaVideo()
    .catch((error) => {
      logger.error('Error while fetching media video ', { error });
    });
}
