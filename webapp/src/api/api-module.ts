import { Injector } from 'plume-ts-di';
import ApiHttpClient from './ApiHttpClient';
import SampleApi from './session/SampleApi';
import TrailerApi from './streaming/TrailerApi';
import GenreApi from './genre/GenreApi';
import GlobalApi from './global/GlobalApi';
import MovieApi from './movie/MovieApi';
import SerieApi from './serie/SerieApi';
import ConfigurationApi from './configuration/ConfigurationApi';

export default function installApiModule(injector: Injector) {
  injector.registerSingleton(ApiHttpClient);
  injector.registerSingleton(SampleApi);
  injector.registerSingleton(TrailerApi);
  injector.registerSingleton(GenreApi);
  injector.registerSingleton(GlobalApi);
  injector.registerSingleton(MovieApi);
  injector.registerSingleton(SerieApi);
  injector.registerSingleton(ConfigurationApi);
}
