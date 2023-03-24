<template>
  <!-- // REM TODO DF Is v-container useless? -->
  <v-container class="pa-0">
    <v-card
      v-for="task in tasks"
      :key="task._id"
      class="pa-1 ma-2 text-body-2"
      color="grey lighten-3"
    >
      {{ task.name }}
    </v-card>

    <v-hover v-slot="{ hover }" v-if="addAction === 0">
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
    <v-card v-else v-click-outside="{ handler: () => { addAction = 0 } }" color="grey lighten-3">
      <v-card-actions class="mx-0 px-0">
        <v-text-field
          v-model="newTask.name"
          solo
          autofocus
          color="black"
          :append-icon="mdiContentSave"
          :rules="requiredName"
          :disabled="!newTask.name"
          :loading="newTask.isCreatePending"
          @click="createTask"
        />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" >
import { computed, ref, defineComponent } from '@vue/composition-api';
import { useGet, models } from 'feathers-vuex';
import { mdiContentSave } from '@mdi/js';

export default defineComponent({
  name: 'Tasks',
  components: {
  },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  setup(props, context) {
    // 1. Get a reference to the model class
    const { Task } = models.api;

    const newTask = ref(new Task());

    // Variables
    const addAction = ref(0);
    const addTask = () => { addAction.value = 1; };
    const createTask = async () => {
      await newTask.value.create();
      newTask.value = new Task();
    };

    const requiredName = computed(() => [(newTask.value.name === '' ? 'Cannot be empty' : true)]);

    // 4. Return the data, named as you prefer
    return {
      requiredName,
      newTask,
      addTask,
      createTask,
      addAction,
      mdiContentSave
    };
  },
});
</script>
