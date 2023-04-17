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
  setup(props, context) {
    // const dragend = (event) => {
    //   // eslint-disable-next-line no-underscore-dangle
    //   const vParent = document.getElementById(props.fTask._id).closest('.data-list');
    //   console.log('dragend');
    //   console.log(event.target.id);
    //   console.log(event);
    //   console.log('parent=', vParent.id);
    //   console.log('parent=', props.fTask.listId);
    //   // console.log(vParent.id);
    //   // eslint-disable-next-line no-param-reassign
    //   props.fTask.listId = vParent.id;
    //   props.fTask.save();
    // };
    const dragstart = (event) => {
      event.dataTransfer.clearData();
      event.dataTransfer.setData('text/plain', event.target.id);
    };
    return { dragstart };
  }
});
</script>
<style scoped>
  .hovergrab { cursor: grab; }
</style>
