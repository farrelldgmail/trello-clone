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
            label="User"
          />
          <v-text-field
            label="Display Name"
          />
          <v-text-field
            label="Email"
            type="email"
          />
          <v-text-field
            label="Password"
            type="password"
          />
          <v-text-field
            label="Confirm Password"
            type="password"
          />
          <v-btn class="text-caption font-weight-bold" :disabled="true">
            Sign up
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { mdiFaceMan } from '@mdi/js';

export default defineComponent({
  name: 'Login',
  setup(props, context) {
    return {
      mdiFaceMan
    };
  }
});
</script>
