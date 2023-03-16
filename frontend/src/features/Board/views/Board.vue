<template>
  <div>
    <div v-if="isBoardGetPending">
      <v-skeleton-loader type="image" width="400px" height="30px" />
    </div>
    <div v-else>
      <v-text-field
        v-model="board.name"
        single-line
        dense
        hide-details
        placeholder="ex: My next trip"
        @change="board.save()"
      />
    </div>
  </div>
</template>

<script lang="ts" >
import { computed, ref, defineComponent } from '@vue/composition-api';
import { useGet, models } from 'feathers-vuex';

export default defineComponent({
  name: 'Board',
  components: {
  },
  props: {
    boardId: {
      type: String,
      required: true
    },
  },
  setup(props, context) {
    // 1. Get a reference to the model class
    const { Board } = models.api;

    // Get the patient record
    const { item: board, isPending: isBoardGetPending } = useGet({
      model: Board,
      id: props.boardId
    });

    // 4. Return the data, named as you prefer
    return {
      board,
      isBoardGetPending
    };
  },
});
</script>
