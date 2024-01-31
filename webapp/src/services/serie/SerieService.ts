import { Simulate } from 'react-dom/test-utils';
import { Logger } from 'simple-logging-system';
import SerieApi from '../../api/serie/SerieApi';
import seeking = Simulate.seeking;
import error = Simulate.error;

const logger: Logger = new Logger('SerieService');

export default class SerieService {
  constructor(private readonly serieApi: SerieApi) {
  }

  getNetflixOriginals = () => this.serieApi.getNetflixOriginals()
    .catch((error) => {
      logger.error('Failed to fetch netflix originals series: {} ', { error });
      throw error;
    });

  getSerieById = (id: number) => this.serieApi.getSerieById(id)
    .catch((error) => {
      logger.error('Failed to fetch serie by this id: {} ', { error });
      throw error;
    });

  getForYou = () => this.serieApi.getForYou()
    .catch((error) => {
      logger.error('Failed to fetch for you series: {} ', { error });
      throw error;
    });

  getEpisodes = (id: number, season: number) => this.serieApi.getEpisodes(id, season)
    .catch((error) => {
      logger.error('Failed to fetch episodes: {} ', { error });
      throw error;
    });

  getSeasonAvailable = (id: number) => this.serieApi.getSeasonAvailable(id)
    .catch((error) => {
      logger.error('Failed to fetch season available: {} ', { error });
      throw error;
    });
}
