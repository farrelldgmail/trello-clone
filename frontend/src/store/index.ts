import { createApp } from 'vue';
// import Vuex from 'vuex';
import { createStore } from 'vuex';
import App from '@/App.vue';
import { FeathersVuex } from '@/feathers-client';
import RootState from './interfaces';

const featureName = (str) => {
  const s = str.split('/');
  return s[s.length - 2].toLowerCase();
};

// Store Modules

const requireModule = require.context('../features/', true, /\.module.ts$/);
const modules = requireModule.keys()
  .map((path) => ({ [featureName(path)]: requireModule(path).default }))
  .reduce((acc, mod) => ({ ...acc, ...mod }), {});

// Service Models

const requireModel = require.context('../features/', true, /\.model.ts$/);
const models = requireModel.keys().map((path) => requireModel(path).default);

// .use(Vuex)
createApp(App)
  .use(FeathersVuex);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ApiModels { /* Let each service augment this interface */ }

declare module 'feathers-vuex' {
  interface FeathersVuexGlobalModels {
    api: ApiModels,
  }
}

export default createStore({
  modules: {
    ...modules
  },
  plugins: [
    ...models
  ],
});
