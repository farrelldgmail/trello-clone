import { ServiceState } from 'feathers-vuex';
import feathersClient, {
  makeServicePlugin,
  BaseModel,
} from '@/feathers-client';
import { ListInterface } from '@/shared/types/lists';
import hooks from './service.hooks';

const modelName = 'List';
const servicePath = 'lists';

export class List extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = modelName;

  static instanceDefaults(): ListInterface {
    return {
      name: null,
      color: null,
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface List {}

declare module 'feathers-vuex' {
  interface FeathersVuexStoreState {
    [servicePath]: ServiceState<List>
  }
}

declare module 'src/store' {
  interface ApiModels {
    [modelName]: typeof List
  }
}

const servicePlugin = makeServicePlugin({
  Model: List,
  service: feathersClient.service(servicePath),
  servicePath
});

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks(hooks);
export default servicePlugin;
