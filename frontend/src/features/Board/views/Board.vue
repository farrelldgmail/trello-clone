<template>
  <!-- // REM TODO DF centrer -->
  <div v-if="isBoardGetPending" class="fill-height">
    <v-progress-circular
      indeterminate
      color="primary"
      :size="70"
      :width="7"
    />
  </div>
  <div v-else>
    <v-img
      :src="board.backgroundUrl"
      cover
      class="fill-height"
    >
      <div>
        <div>
          <v-text-field
            v-model="board.name"
            single-line
            dense
            hide-details
            placeholder="Name"
            @change="board.save()"
          />
        </div>
      </div>
    </v-img>
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
