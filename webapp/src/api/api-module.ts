import { Injector } from 'plume-ts-di';
import ApiHttpClient from './ApiHttpClient';
import SampleApi from './session/SampleApi';
import TrailerApi from './streaming/TrailerApi';
import GenreApi from './general/GenreApi';
import GlobalApi from './preview-movies/GlobalApi';
import MovieApi from './movie/MovieApi';
import SerieApi from './serie/SerieApi';

export default function installApiModule(injector: Injector) {
  injector.registerSingleton(ApiHttpClient);
  injector.registerSingleton(SampleApi);
  injector.registerSingleton(TrailerApi);
  injector.registerSingleton(GenreApi);
  injector.registerSingleton(GlobalApi);
  injector.registerSingleton(MovieApi);
  injector.registerSingleton(SerieApi);
}
