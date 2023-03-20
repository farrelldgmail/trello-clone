<template>
  <div v-if="isBoardGetPending" class="fill-height">
    <v-card class="text-center grey d-flex flex-column align-center justify-center" height="100%">
      <v-progress-circular
        indeterminate
        color="primary"
        :size="70"
        :width="7"
      />
    </v-card>
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
            placeholder="Name"
            :rules="requiredName"
            dark
            solo
            solo-inverted
            single-line
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

    const requiredName = computed(() => [(board.value.name === '' ? 'Cannot be empty' : true)]);

    // 4. Return the data, named as you prefer
    return {
      board,
      isBoardGetPending,
      requiredName
    };
  },
});
</script>
