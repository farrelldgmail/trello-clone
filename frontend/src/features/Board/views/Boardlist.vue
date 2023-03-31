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
            <!-- // REM TODO DF -->
            <v-card-text class="px-1 py-0" left>
              {{ displayOwner(board.owner.displayname) }} - {{ timeAgo(board.updatedAt) }}
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
        xl="2"
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
    // eslint-disable-next-line no-underscore-dangle
    const userId = context.root.$store.state.auth.user._id;

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
      addAction.value = 0;
    };

    const displayOwner = (displayname) => ((context.root.$store.state.auth.user.displayname === displayname) ? 'You' : displayname);

    const timeAgo = (date) => {
      const rightNow = new Date();
      const dateUpdated = new Date(date);
      const diff = (rightNow.getTime() - dateUpdated.getTime()) / 1000;

      const years = diff / (60 * 60 * 24 * 365);
      if (years >= 1) return (Math.floor(years) === 1) ? 'A year ago' : 'A few years ago';

      const months = diff / (60 * 60 * 24 * 30);
      if (months >= 1) return (Math.floor(months) === 1) ? 'A month ago' : 'A few months ago';

      const weeks = diff / (60 * 60 * 24 * 7);
      if (weeks >= 1) return (Math.floor(weeks) === 1) ? 'A week ago' : 'A few weeks ago';

      const days = diff / (60 * 60 * 24);
      if (days >= 1) return (Math.floor(days) === 1) ? 'A day ago' : 'A few days ago';

      const hours = diff / (60 * 60);
      if (hours >= 1) return (Math.floor(hours) === 1) ? 'An hour ago' : 'A few hours ago';

      const minutes = diff / 60;
      if (minutes >= 1) return (Math.floor(minutes) === 1) ? 'A minute ago' : 'A few minutes ago';

      return 'A few seconds ago';
    };

    const requiredName = computed(() => [(newBoard.value.name === '' ? 'Name is required' : true)]);

    // 4. Return the data, named as you prefer
    return {
      boards,
      isBoardFindPending,
      newBoard,
      createBoard,
      addBoard,
      displayOwner,
      timeAgo,
      requiredName,
      addAction,
      mdiDeleteForever
    };
  },
});
</script>
