import { createApp } from 'vue';
import 'vuetify/dist/vuetify.min.css';
import { createVuetify } from 'vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

const vuetify = createVuetify();

// REM TODO DF
// render: (h) => h(App),
createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  .mount('#app');
