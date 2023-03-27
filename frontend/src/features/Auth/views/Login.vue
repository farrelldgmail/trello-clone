<template>
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
            v-model="newUser.email"
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
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { mdiClipboardAccount } from '@mdi/js';
import { models } from 'feathers-vuex';
// import login from '../../../../public/client.js';

export default defineComponent({
  name: 'Login',
  setup(props, context) {
    // References to models
    const { User } = models.api;

    // Variables
    const newUser = ref(new User());

    // Other functions
    /**/
    // const socket = io();
    // const client = feathers();
    //
    // client.configure(feathers.socketio(socket));
    // client.configure(feathers.authentication());
    // const login = async (credentials) => {
    //   try {
    //     // Otherwise log in with the `local` strategy using the credentials we got
    //     await client.authenticate({
    //       strategy: 'local',
    //       credentials
    //     });
    //
    //     // If successful, show the board page
    //     document.location.href = 'http://localhost:8080/board';
    //   } catch (error) {
    //     // On error, stay on login page
    //     document.location.href = 'http://localhost:8080/login';
    //   }
    // };
    /**/
    const validateLogin = () => {
      console.log('ok');
      // login({ email: newUser.value.email, password: newUser.value.password });
    };

    return {
      mdiClipboardAccount,
      newUser,
      validateLogin
    };
  }
});
</script>
