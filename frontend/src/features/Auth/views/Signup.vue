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
            mdi-face-man
          </v-icon>
          <v-text-field
            v-model="newUser.username"
            label="User"
            :rules="requiredUsername"
            validate-on-blur
          />
          <v-text-field
            v-model="newUser.displayname"
            label="Display Name"
            :rules="requiredDisplayname"
            validate-on-blur
          />
          <v-text-field
            v-model="newUser.email"
            label="Email"
            type="email"
            :rules="requiredValidEmail"
            validate-on-blur
          />
          <v-text-field
            v-model="newUser.password"
            label="Password"
            type="password"
            :rules="requiredPass"
            validate-on-blur
          />
          <v-text-field
            v-model="pass2"
            label="Confirm Password"
            type="password"
            :rules="requiredPass2"
            validate-on-blur
          />
          <v-btn class="text-caption font-weight-bold" :disabled="canCommit(newUser,pass2)" @click="createUser()">
            Sign up
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { computed, ref } from 'vue';
import { models } from 'feathers-vuex';
import { useRouter } from 'vue-router';
import { createNamespacedHelpers } from 'vuex-composition-helpers';

// REM TODO DF Namespace not found
const { useActions } = createNamespacedHelpers('auth');

const { User } = models.api;

// Variables
const newUser = ref(new User());
const pass2 = ref('');
const { authenticate } = useActions(['authenticate']);
const router = useRouter();

const login = async () => {
  await authenticate({
    username: newUser.value.username,
    password: newUser.value.password,
    strategy: 'local'
  });

  await router.push('/board');
};

// Data manipulations functions
const createUser = async () => {
  await newUser.value.create();
  await login();
};

// Validation functions
const passwordsMatch = (pass1, pass2) => pass1 === pass2;
// eslint-disable-next-line max-len
const validateEmail = (email) => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase()));
// eslint-disable-next-line max-len
const canCommit = (usr, pass2) => !(!!usr.username && !!usr.displayname && !!usr.password && validateEmail(usr.email) && passwordsMatch(usr.password, pass2));
const requiredUsername = computed(() => [(newUser.value.username === '' ? 'Cannot be empty' : true)]);
const requiredDisplayname = computed(() => [(newUser.value.displayname === '' ? 'Cannot be empty' : true)]);
// eslint-disable-next-line max-len
const requiredValidEmail = computed(() => [(newUser.value.email === '' || !validateEmail(newUser.value.email) ? 'Must be a valid email' : true)]);
const requiredPass = computed(() => [(newUser.value.password === '' ? 'Cannot be empty' : true)]);
const requiredPass2 = computed(() => [(pass2.value === '' ? 'Cannot be empty' : true)]);
</script>
