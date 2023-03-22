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
      <!-- // REM TODO DF  v-if user loggé -->
      <v-menu v-if="true" offset-y>
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
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- v-else -->
      <!-- // REM TODO DF -->
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
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { mdiArrowLeft } from '@mdi/js';

export default defineComponent({
  name: 'App',
  setup(props, context) {
    return {
      mdiArrowLeft
    };
  },
});
</script>
<style scoped>
  .height-menu { height: 56px; }
</style>
