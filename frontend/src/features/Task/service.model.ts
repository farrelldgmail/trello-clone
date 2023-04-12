import { ServiceState } from 'feathers-vuex';
import feathersClient, {
  makeServicePlugin,
  BaseModel,
} from '@/feathers-client';
import { TaskInterface } from '@/shared/types/tasks';
import hooks from './service.hooks';

const modelName = 'Task';
const servicePath = 'tasks';

export class Task extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = modelName;

  static instanceDefaults(): TaskInterface {
    return {
      _id: null,
      name: null,
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Task {}

declare module 'feathers-vuex' {
  interface FeathersVuexStoreState {
    [servicePath]: ServiceState<Task>
  }
}

declare module 'src/store' {
  interface ApiModels {
    [modelName]: typeof Task
  }
}

const servicePlugin = makeServicePlugin({
  Model: Task,
  service: feathersClient.service(servicePath),
  servicePath
});

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks(hooks);
export default servicePlugin;
