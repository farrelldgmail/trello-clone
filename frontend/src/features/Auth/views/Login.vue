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
            <v-btn class="text-caption font-weight-bold" :disabled="newUser.email === '' || newUser.password === ''" @click="login">
              Login
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { mdiClipboardAccount } from '@mdi/js';
import { models } from 'feathers-vuex';
import { createNamespacedHelpers } from 'vuex-composition-helpers';

const { useActions } = createNamespacedHelpers('auth');

export default defineComponent({
  name: 'Login',

  setup(props, context) {
    // References to models
    const { User } = models.api;

    // Variables
    const newUser = ref(new User());
    const { authenticate } = useActions(['authenticate']);
    const router = context.root.$router;

    // Other functions
    const login = async () => {
      try {
        await authenticate({
          username: newUser.value.username,
          password: newUser.value.password,
          strategy: 'local'
        });

        await router.push('/board');
      } catch (error) {
        // REM TODO DF Manager error
        console.log(error.message);
      }
    };

    return {
      mdiClipboardAccount,
      newUser,
      login
    };
  }
});
</script>
