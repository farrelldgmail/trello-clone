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

<script>
// REM TODO DF
import { computed } from '@vue/composition-api';
// import { createNamespacedHelpers } from 'vuex-composition-helpers';

// const { mapActions, mapState } = createNamespacedHelpers('error');

export default {
  name: 'ErrorMessage',
  setup(props, context) {
    const error = computed(() => (context.root.$store.getters['error/getError']));

    const closeError = () => { context.root.$store.commit({ type: 'error/SET_ERROR', message: '', name: '' }); };
    closeError();

    return { error, closeError };
  },
  // methods: {
  //   ...mapActions([
  //     'setError',
  //   ]),
  // }
};
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
