<template>
  <v-container ma-0>
    <v-row v-if="isBoardFindPending" dense align="start">
      <v-col
        v-for="i in 3"
        :key="i"
        xs="12"
        sm="6"
        md="4"
        lg="2"
        xl="1"
      >
        <v-card>
          <v-card-title>
            <v-skeleton-loader type="image" width="400px" height="30px" />
          </v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-skeleton-loader type="button" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else dense>
      <v-col
        v-for="board in boards"
        :key="board._id"
        xs="12"
        sm="6"
        md="4"
        lg="2"
        xl="1"
      >
        <v-card>
          <v-img
            class="white--text bg-white"
            width="auto"
            height="250"
            :aspect-ratio="1"
            :src="board.backgroundUrl"
            cover
          >
            <v-card-title>{{ board.name }} </v-card-title>
          </v-img>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              color="red"
              :loading="board.isRemovePending"
              @click="board.remove()"
            >
              <v-icon
                left
                color="red"
                aria-hidden="false"
                icon="mdi-home"
              />
              <v-icon left color="red" aria-hidden="false">
                {{ mdiDelete }}
              </v-icon>Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        xs="12"
        sm="6"
        md="4"
        lg="2"
        xl="1"
      >
        <v-card v-if="addAction === 0">
          <div><a @click.stop="addBoard">Add a board</a></div>
        </v-card>
        <v-card v-else v-click-outside="{ handler: () => { addAction = 0 } }">
          <v-card-title class="mx-6 px-0">
            <v-text-field
              v-model="newBoard.name"
              dense
              label="Name"
              :rules="requiredName"
            />
          </v-card-title>
          <v-text-field
            v-model="newBoard.backgroundUrl"
            class="mx-6"
            dense
            label="Background"
          />
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              :disabled="newBoard.name === ''"
              :loading="newBoard.isCreatePending"
              @click="createBoard"
            >
              Create
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" >
import { computed, ref, defineComponent } from '@vue/composition-api';
import { useFind, models } from 'feathers-vuex';
import { mdiDelete } from '@mdi/js';

export default defineComponent({
  name: 'Boardlist',
  setup(props, context) {
    // 1. Get a reference to the model class
    const { Board } = models.api;

    // 2. Create a computed property for the params
    const boardsParams = computed(() => ({
      query: { }
    }));

    // 3. Provide the model and params in the options
    const { items: boards, isPending: isBoardFindPending } = useFind({ model: Board, params: boardsParams });

    const newBoard = ref(new Board());

    // Variables
    const addAction = ref(0);
    const addBoard = () => {
      // eslint-disable-next-line max-len
      newBoard.value.backgroundUrl = 'https://images.unsplash.com/photo-1544604860-206456f08229?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80';
      addAction.value = 1;
    };

    const createBoard = async () => {
      await newBoard.value.create();
      newBoard.value = new Board();
    };

    const requiredName = computed(() => [(newBoard.value.name === '' ? 'Name is required' : true)]);

    // 4. Return the data, named as you prefer
    return {
      boards,
      isBoardFindPending,
      newBoard,
      createBoard,
      requiredName,
      addAction,
      addBoard,
      mdiDelete
    };
  },
});
</script>
