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
            {{ mdiFaceMan }}
          </v-icon>
          <v-text-field
            v-model="newUser.username"
            label="User"
          />
          <v-text-field
            v-model="newUser.displayname"
            label="Display Name"
          />
          <v-text-field
            v-model="newUser.email"
            label="Email"
            type="email"
          />
          <v-text-field
            v-model="newUser.password"
            label="Password"
            type="password"
          />
          <v-text-field
            v-model="pass2"
            label="Confirm Password"
            type="password"
          />
          <v-btn class="text-caption font-weight-bold" :disabled="canCommit(newUser,pass2)">
            Sign up
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { mdiFaceMan } from '@mdi/js';
import { models } from 'feathers-vuex';

export default defineComponent({
  name: 'Login',
  setup(props, context) {
    // References to models
    const { User } = models.api;

    // Variables
    const newUser = ref(new User());
    const pass2 = ref('');

    // Validation functions
    // const requiredListName = computed(() => [(newList.value.name === '' ? 'Cannot be empty' : true)]);
    // const requiredBoardName = computed(() => [(board.value.name === '' ? 'Cannot be empty' : true)]);
    const passwordsMatch = (pass1, pass2) => pass1 === pass2;
    // REM TODO DF ValidateEmail ne fonctionne pas
    const validateEmail = (email) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
    const canCommit = (usr, pass2) => {
      console.log('==========');
      console.log(!!usr.username);
      console.log(!!usr.displayname);
      console.log(!!usr.password);
      console.log(validateEmail(usr.email));
      console.log(passwordsMatch(usr.password, pass2));
      return !(!!usr.username && !!usr.displayname && !!usr.password && validateEmail(usr.email) && passwordsMatch(usr.password, pass2));
    };

    return {
      newUser,
      pass2,
      validateEmail,
      passwordsMatch,
      canCommit,
      mdiFaceMan
    };
  }
});
</script>
