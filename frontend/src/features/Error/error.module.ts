export default {
  namespaced: true,
  state: () => ({ error: String }),
  mutations: {
    SET_ERROR(state, message) {
      state.error = message;
    }
  },
  getters: {
    getError(state) {
      return state.error;
    }
  }
};
