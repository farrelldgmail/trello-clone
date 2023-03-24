<template>
  <v-row
    align="start"
    class="py-2 px-4 ma-0"
    dense
  >
    <v-col
      v-for="list in lists"
      :key="list._id"
      xs="12"
      sm="3"
      lg="2"
      xl="2"
    >
      <v-card
        class="px-0 py-0 auto-invert"
        :style="{
          backgroundColor: list.color,
          color: colorInverter(list.color)
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
                        color: colorInverter(list.color)
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
                          backgroundColor: list.color
                        }"
                      >
                        <v-menu offset-y :close-on-content-click="false">
                          <template #activator="{ on, attrs }">
                            <v-btn
                              text
                              class="text-caption font-weight-bold auto-invert px-3 py-2"
                              v-bind="attrs"
                              :style="{
                                backgroundColor: list.color,
                                color: colorInverter(list.color)
                              }"
                              v-on="on"
                            >
                              BACKGROUND COLOR
                              <v-icon :color="colorInverter(list.color)" class="ml-3">
                                {{ mdiFormatColorFill }}
                                {{ mdiColorHelper }}
                              </v-icon>
                            </v-btn>
                          </template>
                          <!-- // REM TODO DF le v-model empêche d'avoir le transparent -->
                          <v-color-picker
                            v-model="list.color"
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
        <Tasks tasks="tasks" />
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
</template>

<script lang="ts" >
import { computed, ref, defineComponent } from '@vue/composition-api';
import { models } from 'feathers-vuex';
import {
  mdiDotsHorizontal, mdiFormatColorFill, mdiColorHelper, mdiMinusCircle
} from '@mdi/js';
import Tasks from './Tasks.vue';

export default defineComponent({
  name: 'Lists',
  components: { Tasks },
  props: {
    lists: {
      type: Array,
      required: true
    }
  },
  setup(props, context) {
    // REM TODO DF useFind les tasks

    // 1. Get a reference to the model class
    const { List } = models.api;
    const { Task } = models.api;

    const newList = ref(new List());

    // Variables
    const addAction = ref(0);
    const mode = ref('rgba');
    const modes = ['hsla', 'rgba', 'hexa'];

    const addList = () => { addAction.value = 1; };

    const createList = async () => {
      await newList.value.create();
      newList.value = new List();
    };

    const requiredName = computed(() => [(newList.value.name === '' ? 'Cannot be empty' : true)]);
    const colorInverter = (col) => {
      const hexVals = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(col);

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

    // REM TODO DF Get tasks
    const tasks = [];

    // 4. Return the data, named as you prefer
    return {
      mode,
      modes,
      requiredName,
      addAction,
      addList,
      createList,
      newList,
      mdiDotsHorizontal,
      mdiFormatColorFill,
      mdiColorHelper,
      mdiMinusCircle,
      colorInverter,
      tasks
    };
  },
});
</script>
<style scoped>
  .opacity-trick { background-color: rgba(81,81,81,0.7) !important; }
  .opacity-trick:hover { background-color: rgba(81,81,81,1) !important; }
  .force-text-align-left { justify-content: left !important;}
</style>
