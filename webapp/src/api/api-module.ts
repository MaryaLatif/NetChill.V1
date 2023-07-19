import { Injector } from 'plume-ts-di';
import ApiHttpClient from './ApiHttpClient';
import SampleApi from './session/SampleApi';
import StreamingApi from './streaming/StreamingApi';
import GeneralApi from './general/GeneralApi';
import PreviewApi from './preview-movies/PreviewApi';

export default function installApiModule(injector: Injector) {
  injector.registerSingleton(ApiHttpClient);
  injector.registerSingleton(SampleApi);
  injector.registerSingleton(StreamingApi);
  injector.registerSingleton(GeneralApi);
  injector.registerSingleton(PreviewApi);
}
