import { ServiceState } from 'feathers-vuex';
import feathersClient, {
  makeServicePlugin,
  BaseModel,
} from '@/feathers-client';
import { BoardInterface } from '@/shared/types/boards';
import hooks from './service.hooks';

const modelName = 'Board';
const servicePath = 'boards';

export class Board extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = modelName;

  static instanceDefaults(): BoardInterface {
    return {
      name: null,
      backgroundUrl: null,
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Board {}

declare module 'feathers-vuex' {
  interface FeathersVuexStoreState {
    [servicePath]: ServiceState<Board>
  }
}

declare module 'src/store' {
  interface ApiModels {
    [modelName]: typeof Board
  }
}

const servicePlugin = makeServicePlugin({
  Model: Board,
  service: feathersClient.service(servicePath),
  servicePath
});

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks(hooks);
export default servicePlugin;
