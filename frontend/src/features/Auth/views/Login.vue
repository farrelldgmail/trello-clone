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
            label="User"
            :autofocus="true"
          />
          <v-text-field
            label="Password"
            type="password"
          />
          <v-btn class="text-caption font-weight-bold" :disabled="true">
            Login
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { mdiClipboardAccount } from '@mdi/js';

export default defineComponent({
  name: 'Login',
  setup(props, context) {
    return {
      mdiClipboardAccount
    };
  }
});
</script>
