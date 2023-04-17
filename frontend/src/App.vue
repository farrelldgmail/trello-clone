<template>
  <v-app>
    <v-app-bar
      app
      fixed
      dense
      theme="dark"
      color="blue darken-3"
      height="56"
    >
      <v-btn
        v-if="$route.name === 'boardDetail'"
        icon
        color="primary"
        to="/board"
      >
        <v-icon
          left
          color="white"
        >
          {{ mdiArrowLeft }}
        </v-icon>
      </v-btn>
      <v-app-bar-title class="px-3 white--text">
        <div class="font-weight-medium">
          Demo
        </div>
      </v-app-bar-title>
      <v-spacer />
      <v-menu v-if="isAuthenticated" offset-y>
        <template #activator="{ on, attrs }">
          <v-app-bar-nav-icon>
            <v-img
              width="32"
              height="32"
              contain
              v-bind="attrs"
              :src="'https://img.icons8.com/color/1x/circled-user-male-skin-type-7--v1.png'"
              v-on="on"
            />
          </v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title class="hover-pointer" @click="logoutRedirect">
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-container v-else>
        <v-row>
          <v-col class="text-right">
            <v-btn
              text
              class="white--text text-subtitle-2 font-weight-medium"
              height="56"
              to="/login"
            >
              Login
            </v-btn>
            <v-btn
              text
              class="white--text text-subtitle-2 font-weight-medium"
              height="56"
              to="/signup"
            >
              Sign up
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
      <error-message />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { mdiArrowLeft } from '@mdi/js';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import errorMessage from '@/features/Error/components/errorMessage.vue';

const { useActions: useActionAuth } = createNamespacedHelpers('auth');
const { useActions: useActionError } = createNamespacedHelpers('error');

export default defineComponent({
  name: 'App',
  components: { errorMessage },
  errorCaptured(error) {
    // Send error in store (error module)
    console.log('Error captured=', error);
    const { message, name } = error;
    this.setError({ message, name });
    setTimeout(() => {
      this.setError({ message: '', name: '' });
    }, 3000);
    return false;
  },
  // methods: {
  //   // REM TODO DF
  //   setError() {
  //     console.log('call dispatch');
  //     this.$store.dispatch('error/setError', { message: 'Message', name: 'Name' });
  //     console.log('called dispatch');
  //   }
  // },
  setup(props, context) {
    const { logout } = useActionAuth(['logout']);
    const router = context.root.$router;
    const { setError } = useActionError(['setError']);

    const logoutRedirect = () => {
      logout();
      router.push('/');
    };

    const isAuthenticated = computed(() => (context.root.$store.state.auth.user !== null));

    return {
      setError,
      logoutRedirect,
      isAuthenticated,
      mdiArrowLeft
    };
  },
});
</script>
<style scoped>
  .hover-pointer:hover { cursor: pointer; }
</style>
