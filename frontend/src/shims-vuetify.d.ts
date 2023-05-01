// eslint-disable-next-line import/no-unresolved
import 'vuetify/types';

declare module 'vuetify/lib/framework' {
  // import Vuetify from 'vuetify';
  import { createVuetify } from 'vuetify';

  const vuetify = createVuetify();
  export default vuetify;
}
