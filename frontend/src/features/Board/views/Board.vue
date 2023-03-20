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
  <div v-else class="fill-height">
    <!-- // REM TODO DF Must not scroll...why is it scrolling? -->
    <v-img
      :src="board.backgroundUrl"
      cover
    >
      <!--       class="fill-height" -->
      <div>
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
      </div>

      <v-container class="ma-0 px-4 py-2" fluid>
        <v-row
          align="start"
          class="pa-0"
          dense
        >
          <v-col
            v-for="i in 3"
            :key="i"
            xs="12"
            sm="3"
            md="2"
            xl="1"
          >
            <v-card
              class="px-0 py-0"
            >
              <v-container class="pa-2 auto-invert">
                <v-row
                  justify="space-between"
                  class="pa-0"
                >
                  <v-col cols="10">
                    Titre plus long
                  </v-col>
                  <v-col cols="2">
                    <v-menu
                      offset-x
                    >
                      <template
                        #activator="{ on, attrs }"
                      >
                        <v-icon
                          right
                          v-bind="
                            attrs"
                          v-on="on"
                        >
                          {{ mdiDotsHorizontal }}
                        </v-icon>
                      </template>
                      <v-card>
                        CARTE QUI POP
                      </v-card>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
              <v-container class="pa-0">
                <v-hover v-slot="{ hover }">
                  <v-card
                    theme="light"
                    class="px-0 py-0"
                    :color="hover ? 'grey lighten-1 black-text' : 'grey lighten-2 grey--text'"
                    @click.stop="addCard"
                  >
                    <div class="caption px-2 py-1">
                      <span
                        :class="{ 'text-decoration-underline': hover }"
                      >Add a card...</span>
                    </div>
                  </v-card>
                </v-hover>
              </v-container>
            </v-card>
          </v-col>
          <v-col
            xs="12"
            sm="3"
            md="2"
            xl="1"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                class="px-1 py-0"
                :color="hover ? 'grey' : 'grey lighten-2'"
                @click.stop="addList"
              >
                <div>
                  <span
                    class="caption ma-0"
                    :class="{ 'text-decoration-underline': hover }"
                  >Add a list...</span>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </div>
</template>

<script lang="ts" >
import { computed, ref, defineComponent } from '@vue/composition-api';
import { useGet, models } from 'feathers-vuex';
import { mdiDotsHorizontal } from '@mdi/js';

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
      requiredName,
      mdiDotsHorizontal
    };
  },
});
</script>
