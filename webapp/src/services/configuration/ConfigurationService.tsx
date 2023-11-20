import { Logger } from 'simple-logging-system';
import ConfigurationApi from '../../api/configuration/ConfigurationApi';
import { Configuration } from '../../api/types/MovieDbTypes';

const logger = new Logger('StreamingService');

export default class ConfigurationService {
  private configuration: Configuration | undefined;

  constructor(private readonly configurationApi: ConfigurationApi) {
  }

  loadConfiguration = () => this.configurationApi.getConfiguration()
    .then((appConfiguration) => {
      this.configuration = appConfiguration;
    })
    .catch((error) => {
      logger.error('Error while fetching configuration', { err: error });
      throw error;
    });

  getConfiguration = ():Configuration => {
    if (!this.configuration) {
      throw new Error();
    }
    return this.configuration;
  };

  getConnectionKey = () => {
    if (!this.configuration) {
      throw new Error();
    }
    return this.configuration.connectionKey;
  };
}
