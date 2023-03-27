<template>
  <v-container class="ma-0 pa-4" fluid>
    <v-row
      v-if="isBoardFindPending"
      align="start"
      class="pa-0"
      dense
    >
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

    <v-row v-else class="pa-0" dense>
      <v-col
        v-for="board in boards"
        :key="board._id"
        xs="12"
        sm="6"
        md="4"
        lg="2"
        xl="2"
      >
        <v-card :to="{ path: `/board/${board._id}` }">
          <v-img
            class="white--text bg-white"
            :height="200"
            :src="board.backgroundUrl"
            cover
          >
            <v-card-title>{{ board.name }} </v-card-title>
          </v-img>
          <v-card-actions>
            <v-img
              width="20"
              height="20"
              cover
              :src="'https://img.icons8.com/color/1x/circled-user-male-skin-type-7--v1.png'"
            />
            <v-card-text class="px-1 py-0" left>
              User - Some time ago
            </v-card-text>
            <v-btn
              small
              fab
              text
              class="error--text pa-0 rounded-circle"
              @click.prevent="board.remove()"
            >
              <v-icon
                left
                small
                color="red"
              >
                {{ mdiDeleteForever }}
              </v-icon>
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
        <v-hover v-slot="{ hover }" v-if="addAction === 0">
          <v-card
            class="px-1 py-0"
            :color="hover ? 'grey lighten-1 black--text' : 'grey lighten-2 grey--text'"
            flat
            @click.stop="addBoard"
          >
            <div>
              <span
                class="caption ma-0"
                :class="{ 'text-decoration-underline': hover }"
              >Add a board...</span>
            </div>
          </v-card>
        </v-hover>
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
              :disabled="!newBoard.name"
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
import { mdiDeleteForever } from '@mdi/js';

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
      mdiDeleteForever
    };
  },
});
</script>
