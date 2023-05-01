<template>
  <transition name="fadeAway">
    <v-card
      v-if="error.name"
      outlined
      class="top-right define-widths"
    >
      <v-card-title class="error-title-bg white--text">
        Error
      </v-card-title>
      <v-card-text class="pa-2">
        <div>{{ error.message }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          @click.prevent="
            closeError"
        >
          Close
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </transition>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { createNamespacedHelpers } from 'vuex-composition-helpers';

// REM TODO DF Mimic app.vue for add action
const { useActions: useActionError } = createNamespacedHelpers('error');

const store = useStore();

const error = computed(() => (store.getters['error/getError']));
const { setError } = useActionError(['setError']);

const closeError = () => { setError({ message: '', name: '' }); };
closeError();
</script>

<style scoped>
.error-title-bg { background-color: #1565c0; }
.top-right {
  position: absolute;
  top: 1vh;
  right: 1vw;
}
.define-widths {
  min-width: 20vw;
  max-width: 30vw;
}
.fadeAway-enter-active {
  transition: all 0.3s ease;
}
.fadeAway-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.fadeAway-leave-to,
.fadeAway-enter {
  opacity: 0;
  transform: translateX(100px);
}
</style>
