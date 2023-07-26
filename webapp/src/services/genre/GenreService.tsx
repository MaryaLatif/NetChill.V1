import { Logger } from 'simple-logging-system';
import GenreApi from '../../api/general/GenreApi';
import { Genre } from '../../api/types/MovieDbTypes';

const logger = new Logger('GenreService');

export default class GenreService {
  constructor(private readonly generalApi: GenreApi) {
  }

  getGenreById(ids: number[]) {
    return Promise.allSettled(ids.map((id) => this.generalApi.getGenreById(id)))
      .then((results) => results.map((r: PromiseSettledResult<Genre>) => {
        if (r.status !== 'fulfilled') {
          return undefined;
        }
        return r.value;
      })
        .filter((genre) => !!genre) as Genre[]);
  }

  getPreviewGenres = () => this.generalApi.getPreviewGenre()
    .catch((error) => {
      logger.error('Error', error);
      throw error;
    });
}
