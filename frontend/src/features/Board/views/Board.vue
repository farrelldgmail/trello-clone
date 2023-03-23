<template>
  <!--  <div v-if="isBoardGetPending" class="fill-height">-->
  <!--    <v-card class="text-center grey d-flex flex-column align-center justify-center" height="100%">-->
  <!--      <v-progress-circular-->
  <!--        indeterminate-->
  <!--        color="primary"-->
  <!--        :size="70"-->
  <!--        :width="7"-->
  <!--      />-->
  <!--    </v-card>-->
  <!--  </div>-->
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
          :rules="requiredName(board.name)"
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
    <!-- <v-img
      :src="board.backgroundUrl"
      cover
      class="w-100"
    >-->

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
        <v-card
          class="px-0 py-0 auto-invert"
          :style="{
            backgroundColor: colorPicked,
            color: colorInverter(colorPicked)
          }"
        >
          <v-container class="pa-0">
            <v-row
              no-gutters
              class="flex-nowrap bg-surface-variant"
            >
              <v-col
                cols="1"
                style="min-width: 100px; max-width: 100%;"
                class="flex-grow-1 flex-shrink-0"
              >
                <div class="text-body-2 pa-1">
                  Titre plus long
                </div>
              </v-col>

              <v-col
                cols="3"
                class="flex-grow-0 flex-shrink-0 text-right"
              >
                <div>
                  <v-menu
                    offset-x
                    :close-on-content-click="false"
                  >
                    <template
                      #activator="{ on, attrs }"
                    >
                      <v-icon
                        right
                        v-bind="
                          attrs"
                        :style="{
                          color: colorInverter(colorPicked)
                        }"
                        v-on="on"
                      >
                        {{ mdiDotsHorizontal }}
                      </v-icon>
                    </template>
                    <v-card>
                      <v-list>
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-img
                              width="50"
                              height="50"
                              cover
                              :src="'https://img.icons8.com/color/1x/circled-user-male-skin-type-7--v1.png'"
                            />
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <div>Owner</div>
                            <div class="grey--text">
                              a month ago
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item
                          :style="{
                            backgroundColor: colorPicked
                          }"
                        >
                          <v-menu offset-y :close-on-content-click="false">
                            <template #activator="{ on, attrs }">
                              <v-btn
                                text
                                class="text-caption font-weight-bold auto-invert px-3 py-2"
                                v-bind="attrs"
                                :style="{
                                  backgroundColor: colorPicked,
                                  color: colorInverter(colorPicked)
                                }"
                                v-on="on"
                              >
                                BACKGROUND COLOR
                                <v-icon :color="colorInverter(colorPicked)" class="ml-3">
                                  {{ mdiFormatColorFill }}
                                  {{ mdiColorHelper }}
                                </v-icon>
                              </v-btn>
                            </template>
                            <!-- le v-model empêche d'avoir le transparent -->
                            <v-color-picker
                              v-model="colorPicked"
                              width="265"
                              canvas-height="125"
                              :mode.sync="mode"
                            />
                          </v-menu>
                        </v-list-item>
                      </v-list>

                      <v-card-actions class="mt-2">
                        <v-spacer />
                        <v-btn text class="text-caption font-weight-bold  auto-invert error--text px-2">
                          <v-icon color="red">
                            {{ mdiMinusCircle }}
                          </v-icon>
                          DELETE CARD
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </div>
              </v-col>
            </v-row>
          </v-container>

          <v-container class="pa-0">
            <v-card
              v-for="n in 3"
              :key="n"
              class="pa-1 ma-2 text-body-2"
              color="grey lighten-3"
            >
              Carte {{ n }}
            </v-card>

            <v-hover v-slot="{ hover }" v-if="addCardAction !== i">
              <v-card
                flat
                theme="light"
                class="px-0 py-0"
                :color="hover ? 'grey lighten-1 black-text' : 'grey lighten-2 grey--text'"
                @click.stop="addCard(i)"
              >
                <div class="caption px-2 py-1">
                  <span
                    :class="{ 'text-decoration-underline': hover }"
                  >Add a card...</span>
                </div>
              </v-card>
            </v-hover>
            <v-card v-else v-click-outside="{ handler: () => { addCardAction = 0 } }" color="grey lighten-3">
              <v-card-actions class="mx-0 px-0">
                <v-text-field
                  solo
                  autofocus
                  color="black"
                  :append-icon="mdiContentSave"
                />
                <!--
                      v-model="newCard.name"
                      :rules="requiredName(newCard.name)"
                    -->
                <!--                >-->
                <!-- :disabled="!newCard.name"
                      :loading="newCard.isCreatePending"
                      @click.append="createCard"
                    >-->
              </v-card-actions>
            </v-card>
          </v-container>
        </v-card>
      </v-col>
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
              label="Name"
              :autofocus="true"
            />
            <!--
                  v-model="newList.name"
                  :rules="requiredName(newList.name)"
                -->
          </v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn
              class="text-caption"
              :disabled="true"
            >
              <!-- :disabled="!newList.name"
                :loading="newList.isCreatePending"
                @click="createList"
              >-->
              Create
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!--</v-img>-->
</template>

<script lang="ts" >
import { computed, ref, defineComponent } from '@vue/composition-api';
import { useGet, models } from 'feathers-vuex';
import {
  mdiDotsHorizontal, mdiFormatColorFill, mdiColorHelper, mdiMinusCircle, mdiContentSave
} from '@mdi/js';

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
    // const { List } = models.api;
    // const { Card } = models.api;

    // Get the patient record
    const { item: board, isPending: isBoardGetPending } = useGet({
      model: Board,
      id: props.boardId
    });

    // const newList = ref(new List());
    // const newCard = ref(new Card());

    // Variables
    const addCardAction = ref(0);
    const addListAction = ref(0);
    const mode = ref('rgba');
    const modes = ['hsla', 'rgba', 'hexa'];

    const addList = () => { addListAction.value = 1; };
    const addCard = (cardIndex) => { addCardAction.value = cardIndex; };

    // const createList = async () => {
    //  await newList.value.create();
    //  newList.value = new List();
    // };

    // const createCard = async () => {
    //  await newCard.value.create();
    //  newCard.value = new Card();
    // };

    const requiredName = (name) => [(name === '' ? 'Cannot be empty' : true)];

    // REM TODO DF à supprimer
    const colorPicked = ref('#e0e0e0');

    // const valToHex = (val) => {
    //   const hex = val.toString(16);
    //   return hex.length === 1 ? `0${hex}` : hex;
    // };

    // const rgbToHex = (rgbVal) => `#${valToHex(rgbVal.r)}${valToHex(rgbVal.g)}${valToHex(rgbVal.b)}`;

    const colorInverter = (col) => {
      const hexVals = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(col);

      // return rgbToHex({
      //   r: 255 - parseInt(hexVals[1], 16),
      //   g: 255 - parseInt(hexVals[2], 16),
      //   b: 255 - parseInt(hexVals[3], 16)
      // });

      const rgbed = {
        r: 255 - parseInt(hexVals[1], 16),
        g: 255 - parseInt(hexVals[2], 16),
        b: 255 - parseInt(hexVals[3], 16)
      };

      const hsp = Math.sqrt(
        0.299 * rgbed.r * rgbed.r
        + 0.587 * rgbed.g * rgbed.g
        + 0.114 * rgbed.b * rgbed.b
      );

      return (hsp > 127.5) ? '#fff' : '#000';
    };

    // 4. Return the data, named as you prefer
    return {
      board,
      mode,
      modes,
      isBoardGetPending,
      requiredName,
      addCardAction,
      addListAction,
      addCard,
      addList,
      // newCard,
      // newList,
      mdiDotsHorizontal,
      mdiFormatColorFill,
      mdiColorHelper,
      mdiMinusCircle,
      mdiContentSave,
      colorPicked,
      colorInverter
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
