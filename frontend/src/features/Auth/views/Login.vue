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
              mdi-clipboard-account
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
<script setup>
import { computed, ref } from 'vue';
import { models } from 'feathers-vuex';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { useRouter } from 'vue-router';

// REM TODO DF Namespace not found?
const { useActions } = createNamespacedHelpers('auth');

const { User } = models.api;

// Variables
const newUser = ref(new User());
const { authenticate } = useActions(['authenticate']);
const router = useRouter();

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
</script>
