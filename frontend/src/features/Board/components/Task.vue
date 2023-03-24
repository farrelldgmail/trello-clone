<template>
  <v-card
    class="pa-1 ma-2 text-body-2"
    color="grey lighten-3"
  >
    {{ fTask.name }}
  </v-card>
</template>

<script lang="ts" >
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Task',
  props: {
    fTask: {
      type: Object,
      required: true
    }
  },
});
</script>
