import { Scheduler } from 'simple-job-scheduler';
import { Injector } from 'plume-ts-di';
import SampleService from './sample/SampleService';
import TrailerService from './streaming/TrailerService';
import GenreService from './genre/GenreService';
import GlobalService from './preview-movies/GlobalService';
import MovieService from './movie/MovieService';
import SerieService from './serie/SerieService';
import ImageService from './Image/ImageService';

export default function installServicesModule(injector: Injector) {
  injector.registerSingleton(Scheduler);
  // sample service to delete
  injector.registerSingleton(SampleService);
  injector.registerSingleton(TrailerService);
  injector.registerSingleton(GenreService);
  injector.registerSingleton(GlobalService);
  injector.registerSingleton(MovieService);
  injector.registerSingleton(SerieService);
  injector.registerSingleton(ImageService);
}
