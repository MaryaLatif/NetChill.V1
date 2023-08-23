import { Logger } from 'simple-logging-system';
import ConfigurationApi from '../../api/configuration/ConfigurationApi';

const logger = new Logger('StreamingService');

export default class ConfigurationService {
  constructor(private readonly imageApi: ConfigurationApi) {}

  getConfiguration = () => this.imageApi.getConfiguration()
    .catch((error) => {
      logger.error('Error while fetching configuration', { err: error });
      throw error;
    });
}
