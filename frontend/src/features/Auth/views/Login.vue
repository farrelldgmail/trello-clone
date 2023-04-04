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
              :rules="requiredUsername"
            />
            <v-text-field
              v-model="newUser.password"
              label="Password"
              type="password"
              :rules="requiredPass"
            />
            <v-btn class="text-caption font-weight-bold" :disabled="!isUserValid" @click="login">
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

    // Validation functions
    const isUserValid = computed(() => (newUser.value.email !== '' && newUser.value.password !== ''));
    const requiredUsername = computed(() => [(newUser.value.username === '' ? 'Cannot be empty' : true)]);
    const requiredPass = computed(() => [(newUser.value.password === '' ? 'Cannot be empty' : true)]);

    // Other functions
    const login = async () => {
      await authenticate({
        username: newUser.value.username,
        password: newUser.value.password,
        strategy: 'local'
      });

      await router.push('/board');
    };

    return {
      mdiClipboardAccount,
      newUser,
      requiredUsername,
      requiredPass,
      isUserValid,
      login
    };
  }
});
</script>
