<template>
  <v-app>
    <v-app-bar
      color="primary"
      app
      fixed
      flat
      theme="dark"
      class="px-0"
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
      <v-app-bar-title class="white--text px-4">
        <div class="font-weight-bold">
          Demo
        </div>
      </v-app-bar-title>
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            color="primary"
            absolute
            right
            v-bind="attrs"
            v-on="on"
          >
            <v-img
              width="32"
              height="32"
              contain
              :src="'https://img.icons8.com/color/1x/circled-user-male-skin-type-7--v1.png'"
            />
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
