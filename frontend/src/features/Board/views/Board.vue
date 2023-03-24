<template>
  <v-container
    v-if="isBoardGetPending"
    class="pa-0 v-100"
    fluid
  >
    <v-row>
      <v-col cols="12">
        <v-skeleton-loader type="image" width="100%" height="50px" />
      </v-col>
    </v-row>
    <v-row
      align="start"
      class="py-2 px-4 ma-0"
      dense
    >
      <v-col
        v-for="i in 3"
        :key="i"
        xs="12"
        sm="3"
        lg="2"
        xl="2"
      >
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>
  </v-container>
  <v-container
    v-else
    class="pa-0 v-100"
    fluid
    :style="{ background: '#fff url(' + board.backgroundUrl + ') no-repeat center top',
              backgroundSize: 'cover'
    }"
  >
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="board.name"
          placeholder="Name"
          :rules="requiredName"
          dark
          solo
          solo-inverted
          single-line
          dense
          class="headline mb-0"
          @change="board.save()"
        />
      </v-col>
    </v-row>
    <Lists :lists="lists" />
  </v-container>
</template>

<script lang="ts" >
import { computed, ref, defineComponent } from '@vue/composition-api';
import { useGet, useFind, models } from 'feathers-vuex';
import Lists from '@/features/Board/components/Lists.vue';

export default defineComponent({
  name: 'Board',
  components: { Lists },
  props: {
    boardId: {
      type: String,
      required: true
    },
  },
  setup(props, context) {
    // 1. Get a reference to the model class
    const { Board } = models.api;
    const { List } = models.api;

    // Get the board
    const { item: board, isPending: isBoardGetPending } = useGet({
      model: Board,
      id: props.boardId
    });

    // Get the lists
    const listsData = useFind({
      model: List,
      params: {
        query: { boardId: props.boardId }
      }
    });

    const requiredName = computed(() => [(board.value.name === '' ? 'Cannot be empty' : true)]);

    // 4. Return the data, named as you prefer
    return {
      board,
      isBoardGetPending,
      requiredName,
      lists: listsData.items
    };
  },
});
</script>
<style scoped>
  .v-100 { height: 100%; }
</style>
