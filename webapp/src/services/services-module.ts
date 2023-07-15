import { Scheduler } from 'simple-job-scheduler';
import { Injector } from 'plume-ts-di';
import SampleService from './sample/SampleService';
import StreamingService from './streaming/StreamingService';
import GeneralService from './general/GeneralService';

export default function installServicesModule(injector: Injector) {
  injector.registerSingleton(Scheduler);
  // sample service to delete
  injector.registerSingleton(SampleService);
  injector.registerSingleton(StreamingService);
  injector.registerSingleton(GeneralService);
}
