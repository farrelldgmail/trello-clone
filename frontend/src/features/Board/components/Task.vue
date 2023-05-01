<template>
  <v-card
    :id="fTask._id"
    class="pa-1 ma-2 text-body-2 hovergrab"
    color="grey lighten-3"
    draggable="true"
    @dragstart="dragstart($event)"
  >
    {{ fTask.name }}
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue';

// Props
const props = defineProps({
  fTask: {
    type: Object,
    required: true
  }
});

const dragstart = (event) => {
  event.dataTransfer.clearData();
  event.dataTransfer.setData('text/plain', event.target.id);
};
</script>
<style scoped>
  .hovergrab { cursor: grab; }
</style>
