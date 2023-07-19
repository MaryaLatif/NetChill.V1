import GeneralApi from '../../api/general/GeneralApi';
import { Genre } from '../../api/types/MovieDbTypes';

export default class GeneralService {
  constructor(private readonly generalApi: GeneralApi) {
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
}
