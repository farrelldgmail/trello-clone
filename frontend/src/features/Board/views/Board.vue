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
          :rules="requiredBoardName"
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
    <!-- Lists START -->
    <template>
      <v-row
        align="start"
        class="py-2 px-4 ma-0"
        dense
      >
        <list
          v-for="list in fLists"
          :key="list._id"
          :f-list="list"
        />

        <v-col
          xs="12"
          sm="3"
          lg="2"
          xl="2"
        >
          <v-btn
            v-if="addListAction === 0"
            style="text-transform: unset !important;"
            class="white--text text-caption px-1 py-0 opacity-trick force-text-align-left"
            plain
            block
            @click.stop="addList"
          >
            Add a list...
          </v-btn>
          <v-card v-else v-click-outside="{ handler: () => { addListAction = 0 } }">
            <v-card-title class="mx-6 px-0">
              <v-text-field
                v-model="newList.name"
                label="Name"
                :autofocus="true"
                :rules="requiredListName"
              />
            </v-card-title>
            <v-card-actions>
              <v-spacer />
              <v-btn
                class="text-caption"
                :disabled="!newList.name"
                :loading="newList.isCreatePending"
                @click="createList"
              >
                Create
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <!-- Lists END -->
  </v-container>
</template>

<script lang="ts" >
import { computed, ref, defineComponent } from '@vue/composition-api';
import { useGet, useFind, models } from 'feathers-vuex';
import list from '@/features/Board/components/List.vue';

export default defineComponent({
  name: 'Board',
  components: { list },
  props: {
    boardId: {
      type: String,
      required: true
    },
  },
  setup(props, context) {
    // Reference to models
    const { Board } = models.api;
    const { List } = models.api;

    // Variables
    const newList = ref(new List());
    const addListAction = ref(0);

    // Data manipulation functions
    const addList = () => { addListAction.value = 1; };
    const createList = async () => {
      // REM TODO DF La liste est créée, mais ça ne se refresh pas!! Doit-elle être addée à l'array?
      await newList.value.create();
      newList.value = new List();
    };

    // Data retrieval
    // Get the board
    const { item: board, isPending: isBoardGetPending } = useGet({
      model: Board,
      id: props.boardId
    });
    // Get the lists
    // Début guerre
    const listsParams = computed(() => ({
      /* query: { boardId: props.boardId } */ // REM TODO DF Remettre critère
      query: { }
    }));
    const { items: fLists } = useFind({
      model: List,
      params: listsParams
    });

    console.log(fLists);
    const aa = useFind({
      model: List,
      params: listsParams
    });
    console.log(aa.items);
    // Fin guerre

    // Validation functions
    const requiredListName = computed(() => [(newList.value.name === '' ? 'Cannot be empty' : true)]);
    const requiredBoardName = computed(() => [(board.value.name === '' ? 'Cannot be empty' : true)]);

    // 4. Return the data, named as you prefer
    return {
      newList,
      addListAction,
      addList,
      createList,
      board,
      isBoardGetPending,
      fLists,
      requiredListName,
      requiredBoardName,
    };
  },
});
</script>
<style scoped>
  .v-100 { height: 100%; }
  .opacity-trick { background-color: rgba(81,81,81,0.7) !important; }
  .opacity-trick:hover { background-color: rgba(81,81,81,1) !important; }
  .force-text-align-left { justify-content: left !important;}
</style>
