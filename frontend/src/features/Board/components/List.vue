<template>
  <v-col
    xs="12"
    sm="3"
    lg="2"
    xl="2"
  >
    <v-card
      class="px-0 py-0 auto-invert"
      :style="{
        backgroundColor: fList.color,
        color: colorInverter(fList.color)
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
              {{ fList.name }}
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
                      color: colorInverter(fList.color)
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
                        backgroundColor: fList.color
                      }"
                    >
                      <v-menu offset-y :close-on-content-click="false">
                        <template #activator="{ on, attrs }">
                          <v-btn
                            text
                            class="text-caption font-weight-bold auto-invert px-3 py-2"
                            v-bind="attrs"
                            :style="{
                              backgroundColor: fList.color,
                              color: colorInverter(fList.color)
                            }"
                            v-on="on"
                          >
                            BACKGROUND COLOR
                            <v-icon :color="colorInverter(fList.color)" class="ml-3">
                              {{ mdiFormatColorFill }}
                              {{ mdiColorHelper }}
                            </v-icon>
                          </v-btn>
                        </template>
                        <!-- // REM TODO DF le v-model empêche d'avoir le transparent -->
                        <v-color-picker
                          v-model="fList.color"
                          width="265"
                          canvas-height="125"
                          :mode.sync="mode"
                          @input="fList.update()"
                        />
                      </v-menu>
                    </v-list-item>
                  </v-list>

                  <v-card-actions class="mt-2">
                    <v-spacer />
                    <v-btn text class="text-caption font-weight-bold  auto-invert error--text px-2" @click="fList.remove()">
                      <v-icon color="red">
                        {{ mdiMinusCircle }}
                      </v-icon>
                      DELETE LIST
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <!-- Tasks START -->
      <v-container class="pa-0">
        <task
          v-for="task in fTasks"
          :key="task._id"
          :f-task="task"
        />
        <v-hover v-slot="{ hover }" v-if="addTaskAction === 0">
          <v-card
            flat
            theme="light"
            class="px-0 py-0"
            :color="hover ? 'grey lighten-1 black-text' : 'grey lighten-2 grey--text'"
            @click.stop="addTask"
          >
            <div class="caption px-2 py-1">
              <span
                :class="{ 'text-decoration-underline': hover }"
              >Add a card...</span>
            </div>
          </v-card>
        </v-hover>
        <v-card v-else v-click-outside="{ handler: () => { addTaskAction = 0 } }" color="grey lighten-3">
          <v-card-actions class="mx-0 px-0">
            <v-text-field
              v-model="newTask.name"
              solo
              autofocus
              color="black"
              :append-icon="mdiContentSave"
              :rules="requiredTaskName"
              :loading="newTask.isCreatePending"
              @keyup.enter="createTask"
              @click:append="createTask"
            />
            <!-- :disabled="!newTask.name" -->
          </v-card-actions>
        </v-card>
      </v-container>
      <!-- Tasks END -->
    </v-card>
  </v-col>
</template>

<script lang="ts" >
import { computed, ref, defineComponent } from '@vue/composition-api';
import { models, useFind } from 'feathers-vuex';
import {
  mdiDotsHorizontal, mdiFormatColorFill, mdiColorHelper, mdiMinusCircle, mdiContentSave
} from '@mdi/js';
import task from './Task.vue';

export default defineComponent({
  name: 'Lists',
  components: { task },
  props: {
    fList: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    // Reference to models
    const { Task } = models.api;

    // Variables
    const mode = ref('rgba');
    const modes = ['hsla', 'rgba', 'hexa'];
    // eslint-disable-next-line no-underscore-dangle
    const newTask = ref(new Task({ listId: props.fList._id }));
    const addTaskAction = ref(0);

    // Data manipulation functions
    const addTask = () => { addTaskAction.value = 1; };
    const createTask = async () => {
      await newTask.value.create();
      // eslint-disable-next-line no-underscore-dangle
      newTask.value = new Task({ listId: props.fList._id });
      addTaskAction.value = 0;
    };

    // UI manipulation functions
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

    // Data retrieval
    // Get the tasks
    const listsParams = computed(() => ({
      // eslint-disable-next-line no-underscore-dangle
      query: { listId: props.fList._id }
    }));
    const { items: fTasks } = useFind({
      model: Task,
      params: listsParams
    });

    // Validation functions
    const requiredTaskName = computed(() => [(newTask.value.name === '' ? 'Cannot be empty' : true)]);

    // 4. Return the data, named as you prefer
    return {
      mdiDotsHorizontal,
      mdiFormatColorFill,
      mdiColorHelper,
      mdiMinusCircle,
      mdiContentSave,
      mode,
      modes,
      newTask,
      addTaskAction,
      addTask,
      createTask,
      colorInverter,
      requiredTaskName,
      fTasks
    };
  },
});
</script>
