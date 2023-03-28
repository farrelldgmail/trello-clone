<template>
  <div>
    <v-container class="fill-height text-center">
      <v-row justify="center">
        <v-col
          xs="12"
          sm="6"
          md="6"
          lg="6"
          xl="6"
        >
          <v-form>
            <v-icon large>
              {{ mdiClipboardAccount }}
            </v-icon>
            <v-text-field
              v-model="newUser.username"
              label="User"
              :autofocus="true"
            />
            <v-text-field
              v-model="newUser.password"
              label="Password"
              type="password"
            />
            <v-btn class="text-caption font-weight-bold" :disabled="newUser.email === '' || newUser.password === ''" @click="validateLogin">
              Login
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { mdiClipboardAccount } from '@mdi/js';
import { models, useFind } from 'feathers-vuex';
import io from 'socket.io-client';

export default defineComponent({
  name: 'Login',
  setup(props, context) {
    // References to models
    const { User } = models.api;

    // Variables
    const newUser = ref(new User());

    // Other functions
    const validateLogin = async () => {
      const socket = io('http://localhost:3030');

      const authResponse = ref(null);
      const authError = ref(null);
      await socket.emit(
        'create',
        'authentication',
        {
          strategy: 'local',
          username: newUser.value.username,
          password: newUser.value.password
        },
        (authError, authResponse) => {
          if (authError === null) {
            console.log('User logged in!');
            // Go to dashboard
            window.location.href = 'board';
          }
        }
      );
    };

    return {
      mdiClipboardAccount,
      newUser,
      validateLogin
    };
  }
});
</script>
